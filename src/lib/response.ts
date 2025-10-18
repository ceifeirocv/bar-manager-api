// src/utils/response.ts
import { Response } from "express";

export interface SuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  meta?: Record<string, any>;
}

export interface ErrorResponse {
  success: false;
  message: string;
  error: {
    code: string;
    details?: string;
  };
}

export const successResponse = <T>(
  res: Response,
  message: string,
  data: T,
  statusCode = 200,
  meta?: Record<string, any>
): Response<SuccessResponse<T>> => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    ...(meta ? { meta } : {}),
  });
};

export const errorResponse = (
  res: Response,
  message: string,
  code = "INTERNAL_ERROR",
  details?: string,
  statusCode = 500
): Response<ErrorResponse> => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: { code, details },
  });
};
