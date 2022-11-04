import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import showUserByIdService from "../../services/users/showUserById.service";

const showUserByIdController = async (req: Request, res: Response) => {
    const userIdFound = req.params.id
    const userFound = await showUserByIdService(userIdFound);
    return res.json(instanceToPlain(userFound));
};

export default showUserByIdController;