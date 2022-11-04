import { Router } from "express";
import createReservationController from "../controllers/reservations/createReservation.controller";
import showReservationsController from "../controllers/reservations/showReservationsFromUser.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const reservationsRoutes = Router();

reservationsRoutes.post("", ensureAuthMiddleware, createReservationController); //falta middleware de checagem de tipo de user
reservationsRoutes.get("/"), showReservationsController; //listar reservas, colocar middle de login
reservationsRoutes.delete("/:id"); //deletar reservas

export default reservationsRoutes;
