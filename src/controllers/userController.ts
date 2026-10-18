import type { Request, Response } from "express";

import { users } from "../data/users.js";
import type { User, UserRequestBody } from "../types/user.js";

type UserIdParams = {
  id: string;
};

type UserQuery = {
  role?: string;
};

function getUsers(
  request: Request<Record<string, never>, unknown, unknown, UserQuery>,
  response: Response
) {
  const { role } = request.query;
  const matchingUsers = role
    ? users.filter((user) => user.role === role)
    : users;

  response.status(200).json(matchingUsers);
}

function getUserById(request: Request<UserIdParams>, response: Response) {
  const userId = Number(request.params.id);
  const user = users.find((currentUser) => currentUser.id === userId);

  if (!user) {
    response.status(404).json({ message: "User not found" });
    return;
  }

  response.status(200).json(user);
}

function createUser(
  request: Request<Record<string, never>, unknown, UserRequestBody>,
  response: Response
) {
  const { name, role } = request.body ?? {};

  if (
    typeof name !== "string" ||
    name.trim() === "" ||
    (role !== "admin" && role !== "member")
  ) {
    response.status(400).json({
      message: "Name is required and role must be admin or member"
    });
    return;
  }

  const newUser: User = {
    id: Math.max(...users.map((user) => user.id), 0) + 1,
    name: name.trim(),
    role
  };

  users.push(newUser);
  response.status(201).json(newUser);
}

function updateUser(
  request: Request<UserIdParams, unknown, UserRequestBody>,
  response: Response
) {
  const userId = Number(request.params.id);
  const user = users.find((currentUser) => currentUser.id === userId);

  if (!user) {
    response.status(404).json({ message: "User not found" });
    return;
  }

  const { name, role } = request.body ?? {};

  if (name === undefined && role === undefined) {
    response.status(400).json({ message: "Provide a name or role to update" });
    return;
  }

  if (name !== undefined && (typeof name !== "string" || name.trim() === "")) {
    response.status(400).json({ message: "Name cannot be empty" });
    return;
  }

  if (role !== undefined && role !== "admin" && role !== "member") {
    response.status(400).json({ message: "Role must be admin or member" });
    return;
  }

  if (typeof name === "string") {
    user.name = name.trim();
  }

  if (role === "admin" || role === "member") {
    user.role = role;
  }

  response.status(200).json(user);
}

function deleteUser(request: Request<UserIdParams>, response: Response) {
  const userId = Number(request.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    response.status(404).json({ message: "User not found" });
    return;
  }

  users.splice(userIndex, 1);
  response.status(204).send();
}

export { createUser, deleteUser, getUserById, getUsers, updateUser };
