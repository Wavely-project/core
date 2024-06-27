import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import {
	ChannelSchema,
	CreateChannelSchema,
	GetChannelSchema,
	UpdateChannelSchema,
} from '@/api/channels/channelModel';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import {
	messageResponse,
	paginateResponse,
} from '@/common/utils/commonResponses';

import { Messages } from '../messages/messageModel';
import { ChannelUsersView } from '../user/userModel';

export const channelRegistery = new OpenAPIRegistry();

const bearerAuth = channelRegistery.registerComponent(
	'securitySchemes',
	'bearerAuth',
	{
		type: 'http',
		scheme: 'bearer',
		bearerFormat: 'JWT',
	}
);

channelRegistery.register('Channel', ChannelSchema);

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

channelRegistery.registerPath({
	method: 'get',
	path: '/channels/{id}',
	tags: ['Channel'],
	security: [{ [bearerAuth.name]: [] }],
	request: { params: GetChannelSchema.shape.params },
	responses: createApiResponse(ChannelSchema, 'Success'),
});

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

channelRegistery.registerPath({
	method: 'delete',
	path: '/channels/{id}',
	tags: ['Channel'],
	security: [{ [bearerAuth.name]: [] }],
	request: { params: GetChannelSchema.shape.params },
	responses: createApiResponse(messageResponse, 'Success'),
});

channelRegistery.registerPath({
	method: 'get',
	path: '/channels/{id}/users',
	tags: ['Channel'],
	security: [{ bearerAuth: [] }],
	request: { params: GetChannelSchema.shape.params },
	responses: createApiResponse(paginateResponse(ChannelUsersView), 'Success'),
});

channelRegistery.registerPath({
	method: 'get',
	path: '/channels/{id}/messages',
	tags: ['Channel'],
	security: [{ bearerAuth: [] }],
	request: {
		params: GetChannelSchema.shape.params,
		query: GetChannelSchema.shape.query,
	},
	responses: createApiResponse(Messages, 'Success'),
});
