import { Request, Response } from "express";
import { IUserLogin } from "../../interfaces/users";
import loginUserService from "../../services/login/loginUser.service";

const loginUserController = async (req: Request, res: Response) => {
    const data: IUserLogin = req.body;
    const token = await loginUserService(data);
    return res.json({token});
};

export default loginUserController;