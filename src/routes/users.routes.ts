import { Router } from "express";
import createUserController from "../controllers/users/createUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";
import listUsersController from "../controllers/users/listUsers.controller";
import showUserByIdController from "../controllers/users/showUserById.controller";
import softDeleteUserController from "../controllers/users/softDeleteUser.controller";
import updateUserController from "../controllers/users/updateUser.controller";

const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("", listUsersController);
userRoutes.get("/:id", showUserByIdController);
userRoutes.patch("/:id", updateUserController);
userRoutes.delete("/:id", softDeleteUserController);
userRoutes.delete("/:id", deleteUserController);

export default userRoutes;