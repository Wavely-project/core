import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Router } from 'express';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';

import { validateRequest } from '../../common/utils/httpHandlers';
import filesController from './filesController';
import { CreateFileSchema, FileSchema, GetFileSchema } from './filesModel';

export const filesRegistry = new OpenAPIRegistry();
filesRegistry.register('Files', FileSchema);

export const filesRouter: Router = (() => {
	const router = express.Router();

	filesRegistry.registerPath({
		method: 'post',
		path: '/files',
		tags: ['Files'],
		request: {
			body: {
				content: {
					'application/json': {
						schema: CreateFileSchema.shape.body,
					},
				},
			},
		},
		responses: createApiResponse(CreateFileSchema, 'Success'),
	});

	router.post('/', validateRequest(CreateFileSchema), filesController.create);

	filesRegistry.registerPath({
		method: 'get',
		path: '/files/{id}',
		tags: ['Files'],
		request: { params: GetFileSchema.shape.params },
		responses: createApiResponse(FileSchema, 'Success'),
	});

	router.post('/', validateRequest(GetFileSchema), filesController.getById);

	return router;
})();
