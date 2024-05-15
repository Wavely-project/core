import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import * as Schemas from '@/api/workspace/workspaceModel';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { messageResponse } from '@/common/utils/commonResponses';

import { Channels } from '../channels/channelModel';
import { Threads } from '../threads/threadsModel';
import { Users } from '../user/userModel';

export const workspaceRegistry = new OpenAPIRegistry();

const bearerAuth = workspaceRegistry.registerComponent(
	'securitySchemes',
	'bearerAuth',
	{
		type: 'http',
		scheme: 'bearer',
		bearerFormat: 'JWT',
	}
);

workspaceRegistry.register('Workspace', Schemas.WorkspaceSchema);

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

workspaceRegistry.registerPath({
	method: 'get',
	path: '/workspaces/{id}',
	tags: ['Workspace'],
	security: [{ [bearerAuth.name]: [] }],
	request: { params: Schemas.GetWorkspaceSchema.shape.params },
	responses: createApiResponse(Schemas.WorkspaceSchema, 'Success'),
});

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

workspaceRegistry.registerPath({
	method: 'delete',
	path: '/workspaces/{id}',
	tags: ['Workspace'],
	security: [{ [bearerAuth.name]: [] }],
	request: { params: Schemas.DeleteWorkspaceSchema.shape.params },
	responses: createApiResponse(messageResponse, 'Success'),
});

workspaceRegistry.registerPath({
	method: 'get',
	path: '/workspaces/{id}/users',
	tags: ['Workspace'],
	security: [{ [bearerAuth.name]: [] }],
	request: { params: Schemas.GetWorkspaceSchema.shape.params },
	responses: createApiResponse(Users, 'Success'),
});

workspaceRegistry.registerPath({
	method: 'get',
	path: '/workspaces/{id}/channels',
	tags: ['Workspace'],
	security: [{ [bearerAuth.name]: [] }],
	request: {
		params: Schemas.GetWorkspaceSchema.shape.params,
		query: Schemas.GetWorkspaceSchema.shape.query,
	},
	responses: createApiResponse(Channels, 'Success'),
});

workspaceRegistry.registerPath({
	method: 'get',
	path: '/workspaces/{id}/threads',
	tags: ['Workspace'],
	security: [{ [bearerAuth.name]: [] }],
	request: {
		params: Schemas.GetWorkspaceSchema.shape.params,
		query: Schemas.GetWorkspaceSchema.shape.query,
	},
	responses: createApiResponse(Threads, 'Success'),
});
