import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import hpp from 'hpp';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import authRoutes from './routes/auth.routes';
import propertyRoutes from './routes/property.routes';
import favouriteRoutes from './routes/favourite.routes';
import { errorHandler } from './middlewares/error.middleware';

import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Set security HTTP headers
app.use(helmet());

// Global rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: 'draft-7', 
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes' },
});
app.use('/api', limiter);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// Body parser, reading data from body into req.body (with size limit)
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Audit Logging using Morgan
const auditLogStream = fs.createWriteStream(path.join(__dirname, '..', 'audit.log'), { flags: 'a' });

// Custom tokens for detailed tracking
morgan.token('user', (req: any) => req.userId || 'Guest');
morgan.token('body', (req: any) => {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
    const safeBody = { ...req.body };
    delete safeBody.password; // Never log passwords
    return JSON.stringify(safeBody);
  }
  return '';
});

const logFormat = ':date[iso] | IP: :remote-addr | User: :user | :method :url | Status: :status | Body: :body | :response-time ms';

app.use(morgan(logFormat, { stream: auditLogStream }));
app.use(morgan('dev')); // Also log cleanly to console

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/favourites', favouriteRoutes);

// Global error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});

export default app;
