import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Router } from 'express';
import { z } from 'zod';

import * as Schemas from '@/api/workspace/workspaceModel';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { validateRequest } from '@/common/utils/httpHandlers';

import AuthController from '../auth/authController';
import ChannelController from '../channels/channelController';
import { Channels } from '../channels/channelModel';
import CoworkersController from '../coworkers/coworkersController';
import { Users } from '../user/userModel';
import WorkspaceController from './workspaceController';

export const workspaceRegistry = new OpenAPIRegistry();

const bearerAuth = workspaceRegistry.registerComponent('securitySchemes', 'bearerAuth', {
	type: 'http',
	scheme: 'bearer',
	bearerFormat: 'JWT',
});

workspaceRegistry.register('Workspace', Schemas.WorkspaceSchema);

export const workspaceRouter: Router = (() => {
	const router = express.Router();

	workspaceRegistry.registerPath({
		method: 'post',
		path: '/workspaces',
		tags: ['Workspace'],
		security: [{ [bearerAuth.name]: [] }],
		request: {
			body: {
				content: {
					'application/json': {
						schema: Schemas.CreateWorkspaceSchema.shape.body,
					},
				},
			},
		},
		responses: createApiResponse(Schemas.WorkspaceSchema, 'Success'),
	});

	router.post(
		'/',
		[AuthController.authenticate, validateRequest(Schemas.CreateWorkspaceSchema)],
		WorkspaceController.createWorkspace
	);

	workspaceRegistry.registerPath({
		method: 'get',
		path: '/workspaces/{id}',
		tags: ['Workspace'],
		security: [{ [bearerAuth.name]: [] }],
		request: { params: Schemas.GetWorkspaceSchema.shape.params },
		responses: createApiResponse(Schemas.WorkspaceSchema, 'Success'),
	});

	router.get(
		'/:id',
		[AuthController.authenticate, validateRequest(Schemas.GetWorkspaceSchema)],
		WorkspaceController.getWorkspaceById
	);

	workspaceRegistry.registerPath({
		method: 'patch',
		path: '/workspaces/{id}',
		tags: ['Workspace'],
		security: [{ [bearerAuth.name]: [] }],
		request: {
			params: Schemas.UpdateWorkspaceSchema.shape.params,
			body: {
				content: {
					'application/json': {
						schema: Schemas.UpdateWorkspaceSchema.shape.body,
					},
				},
			},
		},
		responses: createApiResponse(Schemas.WorkspaceSchema, 'Success'),
	});

	router.patch(
		'/:id',
		[AuthController.authenticate, validateRequest(Schemas.UpdateWorkspaceSchema)],
		WorkspaceController.updateWorkspace
	);
	workspaceRegistry.registerPath({
		method: 'delete',
		path: '/workspaces/{id}',
		tags: ['Workspace'],
		security: [{ [bearerAuth.name]: [] }],
		request: { params: Schemas.DeleteWorkspaceSchema.shape.params },
		responses: createApiResponse(z.object({ deletedRows: z.number() }), 'Success'),
	});

	router.delete(
		'/:id',
		[AuthController.authenticate, validateRequest(Schemas.DeleteWorkspaceSchema)],
		WorkspaceController.deleteWorkspace
	);

	workspaceRegistry.registerPath({
		method: 'get',
		path: '/workspaces/{id}/users',
		tags: ['Workspace'],
		security: [{ [bearerAuth.name]: [] }],
		request: { params: Schemas.GetWorkspaceSchema.shape.params },
		responses: createApiResponse(Users, 'Success'),
	});
	router.get(
		'/:id/users',
		[AuthController.authenticate, validateRequest(Schemas.GetWorkspaceSchema)],
		CoworkersController.getWorkspaceUsers
	);

	workspaceRegistry.registerPath({
		method: 'get',
		path: '/workspaces/{id}/channels',
		tags: ['Workspace'],
		security: [{ [bearerAuth.name]: [] }],
		request: { params: Schemas.GetWorkspaceSchema.shape.params, query: Schemas.GetWorkspaceSchema.shape.query },
		responses: createApiResponse(Channels, 'Success'),
	});

	router.get(
		'/:id/channels',
		[AuthController.authenticate, validateRequest(Schemas.GetWorkspaceSchema)],
		ChannelController.getWorkspaceChannels
	);

	//TODO: add threads.

	return router;
})();
