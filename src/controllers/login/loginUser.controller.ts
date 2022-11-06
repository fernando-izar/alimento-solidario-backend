import { Request, Response } from "express";
import { IUserLogin } from "../../interfaces/users.interface";
import loginUserService from "../../services/login/loginUser.service";
import { instanceToPlain } from "class-transformer";

const loginUserController = async (req: Request, res: Response) => {
  const data: IUserLogin = req.body;
  const response = await loginUserService(data);
  return res.json(instanceToPlain(response));
};

export default loginUserController;
