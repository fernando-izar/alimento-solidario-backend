import { Response, Request } from "express";
import deleteReservationService from "../../services/reservations/deleteReservation.service";

const deleteReservationController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const userId: string = req.user.id
  const deleteReservation = await deleteReservationService(id, userId);
  return res.status(204).json({
    message: "Reservation successful deleted"
  })
};

export default deleteReservationController;
