import type { RequestHandler } from "express";

import type { UpdateUserBody, UserRequestBody } from "../types/user.js";

const validateUserId: RequestHandler = (request, response, next) => {
  const userId = Number(request.params.id);

  if (!Number.isInteger(userId) || userId <= 0) {
    response.status(400).json({ message: "User id must be a positive integer" });
    return;
  }

  next();
};

const validateUserListQuery: RequestHandler = (request, response, next) => {
  const { page, limit, role, search, sort, order } = request.query;

  const pageNumber = page === undefined ? 1 : Number(page);
  const limitNumber = limit === undefined ? 10 : Number(limit);

  if (!Number.isInteger(pageNumber) || pageNumber <= 0) {
    response.status(400).json({ message: "Page must be a positive integer" });
    return;
  }

  if (!Number.isInteger(limitNumber) || limitNumber <= 0 || limitNumber > 100) {
    response.status(400).json({
      message: "Limit must be an integer between 1 and 100"
    });
    return;
  }

  if (role !== undefined && role !== "admin" && role !== "member") {
    response.status(400).json({ message: "Role must be admin or member" });
    return;
  }

  if (search !== undefined && typeof search !== "string") {
    response.status(400).json({ message: "Search must be text" });
    return;
  }

  if (sort !== undefined && sort !== "id" && sort !== "name" && sort !== "role") {
    response.status(400).json({ message: "Sort must be id, name, or role" });
    return;
  }

  if (order !== undefined && order !== "asc" && order !== "desc") {
    response.status(400).json({ message: "Order must be asc or desc" });
    return;
  }

  next();
};

const validateCreateUser: RequestHandler = (request, response, next) => {
  const { name, role } = (request.body ?? {}) as UserRequestBody;

  if (typeof name !== "string" || name.trim() === "") {
    response.status(400).json({ message: "Name is required" });
    return;
  }

  if (role !== "admin" && role !== "member") {
    response.status(400).json({ message: "Role must be admin or member" });
    return;
  }

  request.body = { name: name.trim(), role };
  next();
};

const validateUpdateUser: RequestHandler = (request, response, next) => {
  const { name, role } = (request.body ?? {}) as UserRequestBody;

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

  const validatedBody: UpdateUserBody = {};

  if (typeof name === "string") {
    validatedBody.name = name.trim();
  }

  if (role === "admin" || role === "member") {
    validatedBody.role = role;
  }

  request.body = validatedBody;
  next();
};

export {
  validateCreateUser,
  validateUserListQuery,
  validateUpdateUser,
  validateUserId
};
