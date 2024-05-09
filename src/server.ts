import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import { createServer } from 'http';
import { pino } from 'pino';

import { authRouter } from '@/api/auth/authRouter';
import { channelRouter } from '@/api/channels/channelRouter';
import { healthCheckRouter } from '@/api/healthCheck/healthCheckRouter';
import { userRouter } from '@/api/user/userRouter';
import { workspaceRouter } from '@/api/workspace/workspaceRouter';
import { openAPIRouter } from '@/api-docs/openAPIRouter';
import errorHandler from '@/common/middleware/errorHandler';
import rateLimiter from '@/common/middleware/rateLimiter';
import requestLogger from '@/common/middleware/requestLogger';
import { env } from '@/common/utils/envConfig';

import { filesRouter } from './api/files/filesRoutes';
import { messagesRouter } from './api/messages/messageRouter';
import { notificationRouter } from './api/notifications/notificationsRoutes';
import { reactionsRouter } from './api/reactions/reactionsRouter';
import { connectSocket } from './sockets/socket';

const logger = pino({ name: 'server start' });
const app: Express = express();
const httpServer = createServer(app);

connectSocket(httpServer);

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
app.use('/workspaces', workspaceRouter);
app.use('/channels', channelRouter);
app.use('/messages', messagesRouter);
app.use('/reactions', reactionsRouter);
app.use('/files', filesRouter);
app.use('/notifications', notificationRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { httpServer as app, logger };
