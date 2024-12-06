import { NextFunction, Request, Response } from "express";
import { httpError } from "../utils/httpError.util";
import logger from "../utils/logger.util";

export const httpErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  logger.error(error.message);
  if (error instanceof httpError) {
    res.status(error.code).json({ error: error.message });
  } else res.status(500).json({ error: "Error de servidor" });
};
