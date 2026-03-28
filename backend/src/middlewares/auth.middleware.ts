import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors';
import { MESSAGES } from '../utils/messages.constants';

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  // Read from cookie first (Priority), then header
  const token = req.cookies?.accessToken || (req.headers.authorization?.startsWith('Bearer ') 
    ? req.headers.authorization.split(' ')[1] 
    : null);

  if (!token) {
    throw new UnauthorizedError(MESSAGES.AUTH.NO_TOKEN);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    req.userId = decoded.userId;
    next();
  } catch {
    throw new UnauthorizedError(MESSAGES.AUTH.INVALID_TOKEN);
  }
};
