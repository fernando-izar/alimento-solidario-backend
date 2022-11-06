import { Router } from "express";
import createUserController from "../controllers/users/createUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";
import listUsersController from "../controllers/users/listUsers.controller";
import showUserByIdController from "../controllers/users/showUserById.controller";
import showUserLoggedController from "../controllers/users/showUserLogged.controller";
import softDeleteUserController from "../controllers/users/softDeleteUser.controller";
import updateUserController from "../controllers/users/updateUser.controller";
import ensureAdmPermissionsMiddleware from "../middlewares/ensureAdmPermissions.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";
import validationBodyPatchMiddleware from "../middlewares/validationBodyPatch.middleware";

const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get("", ensureAuthMiddleware, ensureIsAdmMiddleware, listUsersController);
userRoutes.get("/profile", ensureAuthMiddleware, showUserLoggedController);
userRoutes.get("/:id", ensureAuthMiddleware, ensureIsAdmMiddleware, showUserByIdController);
userRoutes.patch("/:id", ensureAuthMiddleware, ensureAdmPermissionsMiddleware, validationBodyPatchMiddleware, updateUserController);
userRoutes.delete("/soft/:id", ensureAuthMiddleware, ensureAdmPermissionsMiddleware, softDeleteUserController);
userRoutes.delete("/:id", ensureAuthMiddleware, ensureIsAdmMiddleware, deleteUserController);

export default userRoutes;