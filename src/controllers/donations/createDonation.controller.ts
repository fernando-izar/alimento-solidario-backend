import { Request, Response } from "express";
import { IDonationRequest } from "../../interfaces/donations.interface";
import createDonationService from "../../services/donations/createDonation.service";

const createDonationController = async (req: Request, res: Response) => {
  const donation: IDonationRequest = req.body;
  const { user } = req;
  const createdDonation = await createDonationService(donation, user);
  return res.status(201).json(createdDonation);
};

export default createDonationController;
