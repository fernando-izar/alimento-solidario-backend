import { Router } from "express";
import createDonationController from "../controllers/donations/createDonation.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
const donationsRoutes = Router();

donationsRoutes.post("", ensureAuthMiddleware, createDonationController); //colocar middleware de verificacao de tipo
//donationsRoutes.get("", )

export default donationsRoutes;
