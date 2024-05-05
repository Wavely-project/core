import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Router } from 'express';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { validateRequest } from '@/common/utils/httpHandlers';

import AuthController from '../auth/authController';
import MessageController from './messageController';
import {
	CreateMessageSchema,
	DeleteMessageSchema,
	GetMessageSchema,
	MessageSchema,
	UpdateMessageSchema,
} from './messageModel';

export const messageRegistery = new OpenAPIRegistry();

const bearerAuth = messageRegistery.registerComponent('securitySchemes', 'bearerAuth', {
	type: 'http',
	scheme: 'bearer',
	bearerFormat: 'JWT',
});

// messageRegistery.register('Message', MessageSchema);

export const messageRouter: Router = (() => {
	const router = express.Router();

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

	router.post(
		'/',
		[AuthController.authenticate, validateRequest(CreateMessageSchema)],
		MessageController.sendMessage
	);

	messageRegistery.registerPath({
		method: 'get',
		path: '/messages/:id',
		tags: ['Message'],
		security: [{ [bearerAuth.name]: [] }],
		request: {
			params: GetMessageSchema.shape.params,
		},
		responses: createApiResponse(MessageSchema, 'Success'),
	});

	router.get(
		'/:id',
		[AuthController.authenticate, validateRequest(GetMessageSchema)],
		MessageController.getMessageById
	);

	messageRegistery.registerPath({
		method: 'patch',
		path: '/messages/:id',
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

	router.patch(
		'/:id',
		[AuthController.authenticate, validateRequest(UpdateMessageSchema)],
		MessageController.updateMessage
	);

	messageRegistery.registerPath({
		method: 'delete',
		path: '/messages/:id',
		tags: ['Message '],
		security: [{ [bearerAuth.name]: [] }],
		request: {
			params: DeleteMessageSchema.shape.params,
		},
		responses: createApiResponse(MessageSchema, 'Success'),
	});

	router.delete(
		'/:id',
		[AuthController.authenticate, validateRequest(DeleteMessageSchema)],
		MessageController.deleteMessage
	);

	return router;
})();
