import { Response, Request } from "express";
import deleteReservationService from "../../services/reservations/deleteReservation.service";

const deleteReservationController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteReservation = await deleteReservationService(id);
};

export default deleteReservationController;
