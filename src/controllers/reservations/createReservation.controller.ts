import { Request, Response } from "express";
import IReservationRequest from "../../interfaces/reservations";
import createReservationService from "../../services/reservations/createReservation.service";

const createReservationController = async (req: Request, res: Response) => {
  const newReservation: IReservationRequest = req.body;
  const createReservation = await createReservationService(newReservation);
  return res.status(201).json(createReservation);
};

export default createReservationController;
