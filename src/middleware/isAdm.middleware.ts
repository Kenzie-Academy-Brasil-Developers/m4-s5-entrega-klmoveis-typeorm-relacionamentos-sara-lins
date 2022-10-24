import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

const isAdmMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user.isAdm) {
    throw new AppError(403, "User is not admin");
  }

  return next();
};

export default isAdmMiddleware;
