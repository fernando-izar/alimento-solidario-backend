import { Request, Response } from "express";
import showDonationsByIdService from "../../services/donations/showDonationsById.service";

const showDonationsByIdController = async (req: Request, res: Response) => {
  const donationIdFound = req.params.id;
  const donationFound = await showDonationsByIdService(donationIdFound);
  return res.json(donationFound);
};

export default showDonationsByIdController;
