import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger.util";

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Registra información sobre la solicitud
  logger.info(`${req.method} ${req.url} `);
  
  // Continúa con el siguiente middleware
  next();
};
