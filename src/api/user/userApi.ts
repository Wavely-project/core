export const userRegistry = new OpenAPIRegistry();
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { StatusCodes } from 'http-status-codes';

import {
	GetUserSchema,
	UpdateUserSchema,
	UserSchema,
} from '@/api/user/userModel';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { messageResponse } from '@/common/utils/commonResponses';

const bearerAuth = userRegistry.registerComponent(
	'securitySchemes',
	'bearerAuth',
	{
		type: 'http',
		scheme: 'bearer',
		bearerFormat: 'JWT',
	}
);

userRegistry.register('User', UserSchema);

userRegistry.registerPath({
	method: 'get',
	path: '/users/{id}',
	tags: ['User'],
	security: [{ [bearerAuth.name]: [] }],
	request: { params: GetUserSchema.shape.params },
	responses: createApiResponse(UserSchema, 'Success'),
});

userRegistry.registerPath({
	method: 'patch',
	path: '/users/{id}',
	tags: ['User'],
	security: [{ [bearerAuth.name]: [] }],
	request: {
		params: GetUserSchema.shape.params,
		body: {
			content: {
				'application/json': {
					schema: UpdateUserSchema.shape.body,
				},
			},
		},
	},
	responses: {
		[StatusCodes.OK]: {
			description: 'Accepted Response',
			content: {
				'application/json': {
					schema: UserSchema,
				},
			},
		},
	},
});

userRegistry.registerPath({
	method: 'delete',
	path: '/users/{id}',
	tags: ['User'],
	security: [{ [bearerAuth.name]: [] }],
	request: { params: GetUserSchema.shape.params },
	responses: {
		[StatusCodes.OK]: {
			description: 'Accepted Response',
			content: {
				'application/json': {
					schema: messageResponse,
				},
			},
		},
	},
});

userRegistry.registerPath({
	method: 'get',
	path: '/users/{id}/workspaces',
	tags: ['User'],
	security: [{ [bearerAuth.name]: [] }],
	request: { params: GetUserSchema.shape.params },
	responses: createApiResponse(messageResponse, 'Success'),
});
