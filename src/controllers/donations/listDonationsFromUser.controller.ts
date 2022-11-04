import { Request, Response } from "express";
import listDonationsFromUserService from "../../services/donations/listDonationsFromUser.service";
import { instanceToPlain } from "class-transformer";

const listDonationsFromUserController = async (req: Request, res: Response) => {
  const user = req.user;
  const donations = await listDonationsFromUserService(user.id);
  return res.json(instanceToPlain(donations));
};

export default listDonationsFromUserController;
