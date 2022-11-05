import { Request, Response } from "express";
import IReservationRequest from "../../interfaces/reservations.interface";
import createReservationByIdService from "../../services/reservations/createReservationById.service";

const createReservationByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user.id;
  const createReservation = await createReservationByIdService(id, userId);
  return res.status(201).json(createReservation);
};

export default createReservationByIdController;
