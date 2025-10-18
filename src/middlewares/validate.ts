// src/middleware/validate.ts
import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";
import { errorResponse } from "../lib/response";

export const validate = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log({ body: req.body });

    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return errorResponse(
          res,
          "Validation Error",
          "VALIDATION_ERROR",
          error.message,
          400
        );
      }
      next(error);
    }
  };
};
