import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import showDonationsByIdExpandUserService from "../../services/donations/showDonationsByIdExpandUser.service";

const showDonationsByIdExpandUserController = async (req: Request, res: Response) => {
    const donationIdFoundExpandUser = req.params.id
    const donationFoundExpandUser = await showDonationsByIdExpandUserService(donationIdFoundExpandUser);
    return res.json(instanceToPlain(donationFoundExpandUser));
};

export default showDonationsByIdExpandUserController;
  