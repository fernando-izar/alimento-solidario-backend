import { Request, Response } from "express";
import updateDonationService from "../../services/donations/updateDonation.service";
import AppError from "../../errors/appError";

const updateDonationController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updateDonationData = req.body;

    const updatedDonation = await updateDonationService(id, updateDonationData);

    return res.status(200).json(updatedDonation);
  } catch (err) {
    if (err instanceof AppError) {
      const { statusCode, message } = err;

      return res.status(statusCode).json({
        status: "error",
        statusCode,
        message,
      });
    }
  }
};

export default updateDonationController;
