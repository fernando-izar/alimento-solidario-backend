import { Router } from "express";
import createReservationController from "../controllers/reservations/createReservation.controller";
import deleteReservationController from "../controllers/reservations/deleteReservation.controller";
import createReservationByIdController from "../controllers/reservations/createReservatoinById.controller";
import showReservationsController from "../controllers/reservations/showReservationsFromUser.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsCharityMiddleware from "../middlewares/ensureIsCharity.middleware";

const reservationsRoutes = Router();

reservationsRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureIsCharityMiddleware,
  createReservationController
);
reservationsRoutes.post(
  "/:id",
  ensureAuthMiddleware,
  ensureIsCharityMiddleware,
  createReservationByIdController
);
reservationsRoutes.get(
  "/user",
  ensureAuthMiddleware,
  ensureIsCharityMiddleware,
  showReservationsController
);
reservationsRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsCharityMiddleware,
  deleteReservationController
);

export default reservationsRoutes;
