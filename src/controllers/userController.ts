import type { Request, Response } from "express";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

import { pool } from "../database/connection.js";
import type {
  CreateUserBody,
  UpdateUserBody,
  User,
  UserListQuery
} from "../types/user.js";

type UserIdParams = {
  id: string;
};

type UserRow = User & RowDataPacket;
type UserCountRow = RowDataPacket & {
  total: number;
};

async function findUserById(userId: number) {
  const [rows] = await pool.execute<UserRow[]>(
    "SELECT id, name, role FROM users WHERE id = ?",
    [userId]
  );

  return rows[0];
}

async function getUsers(
  request: Request<Record<string, never>, unknown, unknown, UserListQuery>,
  response: Response
) {
  const {
    page = "1",
    limit = "10",
    role,
    search,
    sort = "id",
    order = "asc"
  } = request.query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const offset = (pageNumber - 1) * limitNumber;
  const conditions: string[] = [];
  const values: Array<string | number> = [];

  if (role) {
    conditions.push("role = ?");
    values.push(role);
  }

  if (search?.trim()) {
    conditions.push("name LIKE ?");
    values.push(`%${search.trim()}%`);
  }

  const whereClause = conditions.length > 0
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  const [countRows] = await pool.execute<UserCountRow[]>(
    `SELECT COUNT(*) AS total FROM users ${whereClause}`,
    values
  );

  const [users] = await pool.execute<UserRow[]>(
    `SELECT id, name, role
     FROM users
     ${whereClause}
     ORDER BY ${sort} ${order.toUpperCase()}
     LIMIT ? OFFSET ?`,
    [...values, limitNumber, offset]
  );

  const total = countRows[0]?.total ?? 0;

  response.status(200).json({
    data: users,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber)
    }
  });
}

async function getUserById(request: Request<UserIdParams>, response: Response) {
  const userId = Number(request.params.id);

  const user = await findUserById(userId);

  if (!user) {
    response.status(404).json({ message: "User not found" });
    return;
  }

  response.status(200).json({ data: user });
}

async function createUser(
  request: Request<Record<string, never>, unknown, CreateUserBody>,
  response: Response
) {
  const { name, role } = request.body;

  const [result] = await pool.execute<ResultSetHeader>(
    "INSERT INTO users (name, role) VALUES (?, ?)",
    [name, role]
  );

  const newUser: User = {
    id: result.insertId,
    name,
    role
  };

  response.status(201).json({ data: newUser });
}

async function updateUser(
  request: Request<UserIdParams, unknown, UpdateUserBody>,
  response: Response
) {
  const userId = Number(request.params.id);

  const user = await findUserById(userId);

  if (!user) {
    response.status(404).json({ message: "User not found" });
    return;
  }

  const { name, role } = request.body;
  const updatedName = name ?? user.name;
  const updatedRole = role ?? user.role;

  await pool.execute(
    "UPDATE users SET name = ?, role = ? WHERE id = ?",
    [updatedName, updatedRole, userId]
  );

  response.status(200).json({
    data: {
      id: userId,
      name: updatedName,
      role: updatedRole
    }
  });
}

async function replaceUser(
  request: Request<UserIdParams, unknown, CreateUserBody>,
  response: Response
) {
  const userId = Number(request.params.id);
  const user = await findUserById(userId);

  if (!user) {
    response.status(404).json({ message: "User not found" });
    return;
  }

  const { name, role } = request.body;

  await pool.execute(
    "UPDATE users SET name = ?, role = ? WHERE id = ?",
    [name, role, userId]
  );

  response.status(200).json({
    data: { id: userId, name, role }
  });
}

async function deleteUser(request: Request<UserIdParams>, response: Response) {
  const userId = Number(request.params.id);

  const [result] = await pool.execute<ResultSetHeader>(
    "DELETE FROM users WHERE id = ?",
    [userId]
  );

  if (result.affectedRows === 0) {
    response.status(404).json({ message: "User not found" });
    return;
  }

  response.status(204).send();
}

export {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  replaceUser,
  updateUser
};
