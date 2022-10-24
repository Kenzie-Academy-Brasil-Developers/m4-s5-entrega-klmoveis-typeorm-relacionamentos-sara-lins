import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";

const errorMiddleware = async (
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.log(err);

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};

export default errorMiddleware;
