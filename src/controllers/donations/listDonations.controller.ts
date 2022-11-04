import { Request, Response } from "express";
import listDonationsService from "../../services/donations/listDonations.service";
listDonationsService;

const listDonationsController = async (req: Request, res: Response) => {
  const donations = await listDonationsService();
  return res.json(donations);
};

export default listDonationsController;
