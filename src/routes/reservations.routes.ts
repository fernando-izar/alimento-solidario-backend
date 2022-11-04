import { Router } from "express";
import createReservationController from "../controllers/reservations/createReservation.controller";
import deleteReservationController from "../controllers/reservations/deleteReservation.controller";
import showReservationsController from "../controllers/reservations/showReservationsFromUser.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsCharity from "../middlewares/ensureIsCharity.middleware";

const reservationsRoutes = Router();

reservationsRoutes.post("/reservations", createReservationController); //criar reserva, colocar middle de login e checagem de tipo de user
reservationsRoutes.get("/reservations/user", ensureAuthMiddleware, ensureIsCharity, showReservationsController); //listar reservas, colocar middle de login
reservationsRoutes.delete("/reservations/:id", ensureAuthMiddleware, ensureIsCharity, deleteReservationController); //deletar reservas

export default reservationsRoutes;
