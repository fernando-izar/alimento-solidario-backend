import "reflect-metadata";
import "express-async-errors";
import express from "express";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import { defaultMaxListeners } from "events";
import userRoutes from "./routes/users.routes";

const app = express()
app.use(express.json())

app.use("/users", userRoutes)

app.use(handleErrorMiddleware)

export default app;