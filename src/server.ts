import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import { createServer } from 'http';
import { pino } from 'pino';
import { Server as IOServer } from 'socket.io';

import { authRouter } from '@/api/auth/authRouter';
import { healthCheckRouter } from '@/api/healthCheck/healthCheckRouter';
import { userRouter } from '@/api/user/userRouter';
import { openAPIRouter } from '@/api-docs/openAPIRouter';
import errorHandler from '@/common/middleware/errorHandler';
import rateLimiter from '@/common/middleware/rateLimiter';
import requestLogger from '@/common/middleware/requestLogger';
import { env } from '@/common/utils/envConfig';

import { listeners } from './socket';

const logger = pino({ name: 'server start' });
const app: Express = express();
const httpServer = createServer(app);

const io = new IOServer(httpServer, { cors: { origin: '*', methods: ['GET', 'POST'] } });
io.on('connection', (socket) => listeners(io, socket));

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger());

// Routes
app.use('/health-check', healthCheckRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { httpServer as app, io, logger };
