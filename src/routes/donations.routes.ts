import { Router } from "express";
import createDonationController from "../controllers/donations/createDonation.controller";
import deleteDonationController from "../controllers/donations/deleteDonation.controller";
import listDonationsController from "../controllers/donations/listDonations.controller";
import listDonationsExpandUserController from "../controllers/donations/listDonationsExpandUser.controller";
import listDonationsFromUserController from "../controllers/donations/listDonationsFromUser.controller";
import showDonationsByIdController from "../controllers/donations/showDonationsById.constroller";
import showDonationsByIdExpandUserController from "../controllers/donations/showDonationsByIdExpandUser.controller";
import updateDonationController from "../controllers/donations/updateDonation.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsDonor from "../middlewares/ensureIsDonor.middleware";
import showDonationsByIdExpandUserService from "../services/donations/showDonationsByIdExpandUser.service";
const donationsRoutes = Router();

donationsRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureIsDonor,
  createDonationController
); //colocar middleware de verificacao de tipo
donationsRoutes.get("", listDonationsController);
donationsRoutes.get("/expand", listDonationsExpandUserController);
donationsRoutes.get(
  "/user",
  ensureAuthMiddleware,
  listDonationsFromUserController
);
donationsRoutes.get("/:id", showDonationsByIdController);
donationsRoutes.get("/expand/:id", showDonationsByIdExpandUserController);
donationsRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsDonor,
  deleteDonationController
);
donationsRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureIsDonor,
  updateDonationController
);

export default donationsRoutes;
