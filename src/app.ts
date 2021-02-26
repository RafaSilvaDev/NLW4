import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "reflect-metadata";
import createConnection from "./database";
import { AppErrors } from "./errors/AppErrors";
import { router } from "./routes";

createConnection();
const app = express();

app.use(express.json());
app.use(router);

app.use(
  (error: Error, request: Request, response: Response, _next: NextFunction) => {
    if (error instanceof AppErrors) {
      return response.status(error.statusCode).json({
        message: error.message,
      });
    }

    return response.status(500).json({
      status: "Error!",
      message: `Internal server error ${error.message}`,
    });
  }
);

export { app };
