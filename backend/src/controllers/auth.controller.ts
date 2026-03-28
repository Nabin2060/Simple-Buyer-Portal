import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { registerSchema, loginSchema } from '../validators/auth.validator';
import { AuthRequest } from '../middlewares/auth.middleware';
import { sendSuccess } from '../utils/response';
import { MESSAGES } from '../utils/messages.constants';
import { UnauthorizedError } from '../utils/errors';

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const ACCESS_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 15 * 60 * 1000, // 15 mins
};

export const authController = {
  async register(req: Request, res: Response) {
    const data = registerSchema.parse(req.body);
    const result = await authService.register(data);
    
    // Setting cookies for security
    res.cookie('accessToken', result.accessToken, ACCESS_COOKIE_OPTIONS);
    res.cookie('refreshToken', result.refreshToken, REFRESH_COOKIE_OPTIONS);
    
    // Attach to request for Morgan audit logging
    (req as AuthRequest).userId = result.user.id;

    sendSuccess(res, 201, MESSAGES.USER.REGISTER_SUCCESS, { user: result.user });
  },

  async login(req: Request, res: Response) {
    const data = loginSchema.parse(req.body);
    const result = await authService.login(data);
    
    // Setting cookies for security
    res.cookie('accessToken', result.accessToken, ACCESS_COOKIE_OPTIONS);
    res.cookie('refreshToken', result.refreshToken, REFRESH_COOKIE_OPTIONS);
    
    // Attach to request for Morgan audit logging
    (req as AuthRequest).userId = result.user.id;
    
    sendSuccess(res, 200, MESSAGES.USER.LOGIN_SUCCESS, { user: result.user });
  },

  async logout(_req: Request, res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    sendSuccess(res, 200, 'Logout successful');
  },

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedError('No refresh token provided');
    }
    
    const { accessToken } = await authService.refresh(refreshToken);
    res.cookie('accessToken', accessToken, ACCESS_COOKIE_OPTIONS);
    
    sendSuccess(res, 200, 'Token refreshed successfully');
  },

  async me(req: AuthRequest, res: Response) {
    const user = await authService.getCurrentUser(req.userId!);
    sendSuccess(res, 200, MESSAGES.USER.FETCHED, user);
  },
};
