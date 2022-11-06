import { Request, Response } from "express";
import showReservationsService from "../../services/reservations/showReservationsFromUser.service";
import { instanceToPlain } from "class-transformer";

const showReservationsController = async (req: Request, res: Response) => {
  const userId: string = req.user.id;
  const reservations = await showReservationsService(userId);
  return res.status(200).json(instanceToPlain(reservations));
};

export default showReservationsController;
