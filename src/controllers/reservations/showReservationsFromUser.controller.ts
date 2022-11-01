import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import showReservationsService from "../../services/reservations/showReservationsFromUser.service";

const showReservationsController = async (req: Request, res: Response) => {
  const reservations = await showReservationsService();
  return res.status(200).json(instanceToPlain(reservations));
};

export default showReservationsController;
