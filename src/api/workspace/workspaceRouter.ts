import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Router } from 'express';

import { CreateWorkspaceSchema, WorkspaceSchema } from '@/api/workspace/workspaceModel';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { validateRequest } from '@/common/utils/httpHandlers';

import WorkspaceController from './workspaceController';

export const workspaceRegistry = new OpenAPIRegistry();

const bearerAuth = workspaceRegistry.registerComponent('securitySchemes', 'bearerAuth', {
	type: 'http',
	scheme: 'bearer',
	bearerFormat: 'JWT',
});

workspaceRegistry.register('Workspace', WorkspaceSchema);

export const workspaceRouter: Router = (() => {
	const router = express.Router();

	workspaceRegistry.registerPath({
		method: 'post',
		path: '/workspaces/CreateWorkspace',
		tags: ['Workspace'],
		security: [{ [bearerAuth.name]: [] }],
		request: {
			body: {
				content: {
					'application/json': {
						schema: CreateWorkspaceSchema.shape.body,
					},
				},
			},
		},
		responses: createApiResponse(WorkspaceSchema, 'Success'),
	});

	router.post('/CreateWorkspace', [validateRequest(CreateWorkspaceSchema)], WorkspaceController.createWorkspace);

	workspaceRegistry.registerPath({
		method: 'get',
		path: '/workspaces/GetsWorkspaces',
		tags: ['Workspace'],
		security: [{ [bearerAuth.name]: [] }],
		request: {},
		responses: createApiResponse(WorkspaceSchema, 'Success'),
	});

	router.get('/GetsWorkspaces', WorkspaceController.getWorkspaces);

	return router;
})();
