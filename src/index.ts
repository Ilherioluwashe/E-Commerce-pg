import * as dotenv from "dotenv";
dotenv.config();
import "express-async-errors";

import { AppDataSource } from "./data-source";
import express, { Request, Response } from "express";
const app = express();

import morgan from "morgan";
import cookieParser from "cookie-parser";

import { default as authRouter } from "./routes/authRoutes";
import { default as userRouter } from "./routes/userRoutes";

import { notFoundMiddleware } from "./middleware/not-found";
import { errorHandlerMiddleware } from "./middleware/error-handler";

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req: Request, res: Response) => {
  res.send("E-commerce");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

AppDataSource.initialize()
  .then(async () => {
    app.listen(process.env.PORT, () => console.log("Server Started"));
  })
  .catch((error) => console.log(error));
