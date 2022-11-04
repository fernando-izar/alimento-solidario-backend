import { Request, Response } from "express";
import softDeleteUserService from "../../services/users/softDeleteUser.service";

const softDeleteUserController =async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const softDeletedUser = await softDeleteUserService(id);
    return res.status(204).json({
        message: "User deleted with success!"
    });
};

export default softDeleteUserController;