import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { messageResponse } from '@/common/utils/commonResponses';

import {
	CreateMessageSchema,
	DeleteMessageSchema,
	GetMessageSchema,
	MessageSchema,
	UpdateMessageSchema,
} from './messageModel';

export const messageRegistery = new OpenAPIRegistry();

const bearerAuth = messageRegistery.registerComponent(
	'securitySchemes',
	'bearerAuth',
	{
		type: 'http',
		scheme: 'bearer',
		bearerFormat: 'JWT',
	}
);

messageRegistery.register('Message', MessageSchema);

messageRegistery.registerPath({
	method: 'post',
	path: '/messages',
	tags: ['Message'],
	security: [{ [bearerAuth.name]: [] }],
	request: {
		body: {
			content: {
				'application/json': {
					schema: CreateMessageSchema.shape.body,
				},
			},
		},
	},
	responses: createApiResponse(MessageSchema, 'Success'),
});
messageRegistery.registerPath({
	method: 'get',
	path: '/messages/{id}',
	tags: ['Message'],
	security: [{ [bearerAuth.name]: [] }],
	request: { params: GetMessageSchema.shape.params },
	responses: createApiResponse(MessageSchema, 'Success'),
});

messageRegistery.registerPath({
	method: 'patch',
	path: '/messages/{id}',
	tags: ['Message'],
	security: [{ [bearerAuth.name]: [] }],
	request: {
		params: UpdateMessageSchema.shape.params,
		body: {
			content: {
				'application/json': {
					schema: UpdateMessageSchema.shape.body,
				},
			},
		},
	},
	responses: createApiResponse(MessageSchema, 'Success'),
});

messageRegistery.registerPath({
	method: 'delete',
	path: '/messages/{id}',
	tags: ['Message'],
	security: [{ [bearerAuth.name]: [] }],
	request: {
		params: DeleteMessageSchema.shape.params,
	},
	responses: createApiResponse(messageResponse, 'Success'),
});
