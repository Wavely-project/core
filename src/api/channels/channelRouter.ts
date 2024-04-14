import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Router } from 'express';

import { ChannelSchema, CreateChannelSchema, GetChannelSchema } from '@/api/channels/channelModel';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { validateRequest } from '@/common/utils/httpHandlers';

import AuthController from '../auth/authController';
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
	/************************************************************************** */
	channelRegistery.registerPath({
		method: 'get',
		path: '/channels/getWorkspaceChannel/{id}',
		tags: ['Channel'],
		security: [{ [bearerAuth.name]: [] }],
		request: { params: GetChannelSchema.shape.params },
		responses: createApiResponse(ChannelSchema, 'Success'),
	});

	router.get('/getWorkspaceChannel/:id', AuthController.authenticate, ChannelController.getChannels);
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

	return router;
})();
