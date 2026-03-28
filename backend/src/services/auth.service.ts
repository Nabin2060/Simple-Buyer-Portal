import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { RegisterInput, LoginInput } from '../validators/auth.validator';
import { ConflictError, UnauthorizedError } from '../utils/errors';
import { MESSAGES } from '../utils/messages.constants';

const SALT_ROUNDS = 10;

export const authService = {
  async register(data: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictError(MESSAGES.USER.ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: '7d',
    });

    return { user, accessToken, refreshToken };
  },

  async login(data: LoginInput) {
    const user = await prisma.user.findFirst({
      where: { email: data.email, isDeleted: false },
    });

    if (!user) {
      throw new UnauthorizedError(MESSAGES.USER.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError(MESSAGES.USER.INVALID_CREDENTIALS);
    }

    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: '7d',
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  },

  async refresh(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { userId: string };
      const user = await prisma.user.findFirst({ where: { id: decoded.userId, isDeleted: false } });
      
      if (!user) throw new UnauthorizedError(MESSAGES.USER.NOT_FOUND);

      const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: '15m',
      });

      return { accessToken };
    } catch (err) {
      throw new UnauthorizedError('Invalid or expired refresh token');
    }
  },

  async getCurrentUser(userId: string) {
    const user = await prisma.user.findFirst({
      where: { id: userId, isDeleted: false },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedError(MESSAGES.USER.NOT_FOUND);
    }

    return user;
  },
};
