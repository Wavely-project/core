import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

export const healthCheckRegistry = new OpenAPIRegistry();

export const healthCheckRouter: Router = (() => {
	const router = express.Router();

	healthCheckRegistry.registerPath({
		method: 'get',
		path: '/health-check',
		tags: ['Health Check'],
		responses: createApiResponse(z.null(), 'Success'),
	});

	router.get('/', (_req: Request, res: Response) => {
		handleServiceResponse(res, {}, 'Service is good', StatusCodes.OK);
	});

	return router;
})();
