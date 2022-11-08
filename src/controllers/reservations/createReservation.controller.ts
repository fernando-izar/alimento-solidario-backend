import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import IReservationRequest from "../../interfaces/reservations.interface";
import createReservationService from "../../services/reservations/createReservation.service";

const createReservationController = async (req: Request, res: Response) => {
  const newReservation: IReservationRequest = req.body;
  const userId = req.user.id;
  const createReservation = await createReservationService(
    newReservation,
    userId
  );
  return res.status(201).json(instanceToPlain(createReservation));
};

export default createReservationController;
