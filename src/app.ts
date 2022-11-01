import "reflect-metadata";
import "express-async-errors";
import express from "express";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import userRoutes from "./routes/users.routes";
import loginRoutes from "./routes/login.routes";

const app = express()
app.use(express.json())

app.use("/users", userRoutes)
app.use("/login", loginRoutes)

app.use(handleErrorMiddleware)

export default app;