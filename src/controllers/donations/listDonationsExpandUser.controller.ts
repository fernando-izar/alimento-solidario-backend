import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import listDonationsExpandUserService from "../../services/donations/listDonationsExpandUser.service";

const listDonationsExpandUserController = async (
  req: Request,
  res: Response
) => {
  const donations = await listDonationsExpandUserService();
  return res.json(instanceToPlain(donations));
};

export default listDonationsExpandUserController;
