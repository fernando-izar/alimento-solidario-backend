import { Router } from "express";
import createReservationController from "../controllers/reservations/createReservation.controller";
import showReservationsController from "../controllers/reservations/showReservationsFromUser.controller";

const reservationsRoutes = Router();

reservationsRoutes.post("/reservations", createReservationController); //criar reserva, colocar middle de login e checagem de tipo de user
reservationsRoutes.get("/reservations"), showReservationsController; //listar reservas, colocar middle de login
reservationsRoutes.delete("/reservations/:id"); //deletar reservas

export default reservationsRoutes;
