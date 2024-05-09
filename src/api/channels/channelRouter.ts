import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Router } from 'express';
import { z } from 'zod';

import {
	ChannelSchema,
	CreateChannelSchema,
	DeleteChannelSchema,
	GetChannelSchema,
	UpdateChannelSchema,
} from '@/api/channels/channelModel';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { validateRequest } from '@/common/utils/httpHandlers';

import AuthController from '../auth/authController';
import MembersController from '../members/memberController';
import MessageController from '../messages/messageController';
import { Messages } from '../messages/messageModel';
import { Users } from '../user/userModel';
import ChannelController from './channelController';

export const channelRegistery = new OpenAPIRegistry();

const bearerAuth = channelRegistery.registerComponent('securitySchemes', 'bearerAuth', {
	type: 'http',
	scheme: 'bearer',
	bearerFormat: 'JWT',
});

channelRegistery.register('Channel', ChannelSchema);

export const channelRouter: Router = (() => {
	const router = express.Router();

	channelRegistery.registerPath({
		method: 'post',
		path: '/channels',
		tags: ['Channel'],
		security: [{ [bearerAuth.name]: [] }],
		request: {
			body: {
				content: {
					'application/json': {
						schema: CreateChannelSchema.shape.body,
					},
				},
			},
		},
		responses: createApiResponse(ChannelSchema, 'Success'),
	});

	router.post(
		'/',
		[AuthController.authenticate, validateRequest(CreateChannelSchema)],
		ChannelController.createChannel
	);

	/***************************************************************************** */
	channelRegistery.registerPath({
		method: 'get',
		path: '/channels/{id}',
		tags: ['Channel'],
		security: [{ [bearerAuth.name]: [] }],
		request: { params: GetChannelSchema.shape.params },
		responses: createApiResponse(ChannelSchema, 'Success'),
	});

	router.get(
		'/:id',
		AuthController.authenticate,
		validateRequest(GetChannelSchema),
		ChannelController.getChannelById
	);

	/***************************************************************************** */
	channelRegistery.registerPath({
		method: 'patch',
		path: '/channels/{id}',
		tags: ['Channel'],
		security: [{ [bearerAuth.name]: [] }],
		request: {
			params: UpdateChannelSchema.shape.params,
			body: {
				content: {
					'application/json': {
						schema: UpdateChannelSchema.shape.body,
					},
				},
			},
		},
		responses: createApiResponse(ChannelSchema, 'Success'),
	});

	router.patch(
		'/:id',
		[AuthController.authenticate, validateRequest(UpdateChannelSchema)],
		ChannelController.updateChannel
	);

	/***************************************************************************** */
	channelRegistery.registerPath({
		method: 'delete',
		path: '/channels/{id}',
		tags: ['Channel'],
		security: [{ [bearerAuth.name]: [] }],
		request: { params: GetChannelSchema.shape.params },
		responses: createApiResponse(z.object({ deletedRows: z.number() }), 'Success'),
	});

	router.delete(
		'/:id',
		[AuthController.authenticate, validateRequest(DeleteChannelSchema)],
		ChannelController.deleteChannel
	);

	/***************************************************************************** */
	channelRegistery.registerPath({
		method: 'get',
		path: '/channels/{id}/users',
		tags: ['Channel'],
		security: [{ bearerAuth: [] }],
		request: { params: GetChannelSchema.shape.params },
		responses: createApiResponse(Users, 'Success'),
	});

	router.get(
		'/:id/users',
		[AuthController.authenticate, validateRequest(GetChannelSchema)],
		MembersController.getChannelUsers
	);

	/***************************************************************************** */
	channelRegistery.registerPath({
		method: 'get',
		path: '/channels/{id}/messages',
		tags: ['Channel'],
		security: [{ bearerAuth: [] }],
		request: { params: GetChannelSchema.shape.params, query: GetChannelSchema.shape.query },
		responses: createApiResponse(Messages, 'Success'),
	});

	router.get(
		'/:id/messages',
		[AuthController.authenticate, validateRequest(GetChannelSchema)],
		MessageController.getChannelMessages
	);

	return router;
})();
