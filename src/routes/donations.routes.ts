import { Router } from "express";
import createDonationController from "../controllers/donations/createDonation.controller";
import listDonationsController from "../controllers/donations/listDonations.controller";
import listDonationsExpandUserController from "../controllers/donations/listDonationsExpandUser.controller";
import listDonationsFromUserController from "../controllers/donations/listDonationsFromUser.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
const donationsRoutes = Router();

donationsRoutes.post("", ensureAuthMiddleware, createDonationController); //colocar middleware de verificacao de tipo
donationsRoutes.get("", listDonationsController);
donationsRoutes.get("/expand", listDonationsExpandUserController);
donationsRoutes.get(
  "/user",
  ensureAuthMiddleware,
  listDonationsFromUserController
);

export default donationsRoutes;
