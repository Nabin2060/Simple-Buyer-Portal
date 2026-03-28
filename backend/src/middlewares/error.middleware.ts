import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { ZodError } from 'zod';
import { sendError } from '../utils/response';
import { MESSAGES } from '../utils/messages.constants';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Only log non-application errors to keep logs clean
  if (!(err instanceof AppError)) {
    console.error('[CRITICAL ERR]', err);
  }

  if (err instanceof AppError) {
    return sendError(res, err.statusCode, err.message);
  }

  if (err instanceof ZodError) {
    return sendError(res, 400, MESSAGES.ERROR.VALIDATION, err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    })));
  }

  return sendError(res, 500, MESSAGES.ERROR.INTERNAL_SERVER);
};
