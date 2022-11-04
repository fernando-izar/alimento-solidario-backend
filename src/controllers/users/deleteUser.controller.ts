import { Request, Response } from "express";
import deleteUserService from "../../services/users/deleteUser.service";

const deleteUserController =async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const softDeletedUser = await deleteUserService(id);
    return res.status(204).json({
        message: "User deleted with success!"
    });
};

export default deleteUserController;