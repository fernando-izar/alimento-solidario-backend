import "reflect-metadata";
import "express-async-errors";
import express from "express";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import userRoutes from "./routes/users.routes";
import loginRoutes from "./routes/login.routes";
import classificationRoutes from "./routes/classifications.routes";
import donationsRoutes from "./routes/donations.routes";
import reservationsRoutes from "./routes/reservations.routes";
import { Request, Response } from "express";
import { IEmailRequest } from "./interfaces/email.interface";
import sendEmail from "./nodemailer.util";

const app = express();
app.use(express.json());

var cors = require("cors");
app.use(cors());

app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/classifications", classificationRoutes);
app.use("/donations", donationsRoutes);
app.use("/reservations", reservationsRoutes);

app.use(handleErrorMiddleware);

export default app;
