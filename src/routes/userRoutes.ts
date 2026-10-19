import { Router } from "express";

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  replaceUser,
  updateUser
} from "../controllers/userController.js";
import {
  validateCreateUser,
  validateUserListQuery,
  validateUpdateUser,
  validateUserId
} from "../middleware/validateUser.js";

const userRouter = Router();

userRouter.get("/", validateUserListQuery, getUsers);
userRouter.get("/:id", validateUserId, getUserById);
userRouter.post("/", validateCreateUser, createUser);
userRouter.put("/:id", validateUserId, validateCreateUser, replaceUser);
userRouter.patch("/:id", validateUserId, validateUpdateUser, updateUser);
userRouter.delete("/:id", validateUserId, deleteUser);

export { userRouter };
