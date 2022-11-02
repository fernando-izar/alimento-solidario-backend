import { Router } from "express";
import createUserController from "../controllers/users/createUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";
import listUsersController from "../controllers/users/listUsers.controller";
import showUserByIdController from "../controllers/users/showUserById.controller";
import softDeleteUserController from "../controllers/users/softDeleteUser.controller";
import updateUserController from "../controllers/users/updateUser.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("", ensureAuthMiddleware, ensureIsAdmMiddleware, listUsersController);
userRoutes.get("/:id", showUserByIdController);
userRoutes.patch("/:id", updateUserController);
userRoutes.delete("", softDeleteUserController);
userRoutes.delete("/:id", ensureAuthMiddleware, ensureIsAdmMiddleware, deleteUserController);

export default userRoutes;