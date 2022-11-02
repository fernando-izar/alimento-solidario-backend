import { Request, Response } from "express";
import { IUserUpdate } from "../../interfaces/users";
import updateUSerService from "../../services/users/updateUser.service";

const updateUserController = async (req: Request, res: Response) => {
    const user = req.body;
    console.log(user)
    const id: string = req.params.id;
    console.log(id)
    const updatedUser = await updateUSerService(user, id);
    return res.json(updatedUser);
}

export default updateUserController;