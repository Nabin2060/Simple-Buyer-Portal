import { Response } from 'express';

export const sendSuccess = (res: Response, statusCode: number, message: string, data: any = null) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (res: Response, statusCode: number, message: string, errors: any = null) => {
  const payload: any = {
    success: false,
    message,
  };
  if (errors) payload.errors = errors;
  return res.status(statusCode).json(payload);
};
