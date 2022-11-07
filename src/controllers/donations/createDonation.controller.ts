import { Request, Response } from "express";
import { IDonationRequest } from "../../interfaces/donations.interface";
import createDonationService from "../../services/donations/createDonation.service";
import { instanceToPlain } from "class-transformer";

const createDonationController = async (req: Request, res: Response) => {
  const donation: IDonationRequest = req.body;
  const { user } = req;
  const createdDonation = await createDonationService(donation, user);
  return res.status(201).json(instanceToPlain(createdDonation));
};

export default createDonationController;
