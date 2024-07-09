import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { messageResponse } from '@/common/utils/commonResponses';

import {
	CreateInviteSchema,
	DeleteInviteSchema,
	GetInviteSchema,
	InviteSchema,
	UpdateInviteSchema,
} from './invitesModel';

export const inviteRegistery = new OpenAPIRegistry();

const bearerAuth = inviteRegistery.registerComponent(
	'securitySchemes',
	'bearerAuth',
	{
		type: 'http',
		scheme: 'bearer',
		bearerFormat: 'JWT',
	}
);

inviteRegistery.register('Invite', InviteSchema);

inviteRegistery.registerPath({
	method: 'post',
	path: '/invites',
	tags: ['Invite'],
	security: [{ [bearerAuth.name]: [] }],
	request: {
		body: {
			content: {
				'application/json': {
					schema: CreateInviteSchema.shape.body,
				},
			},
		},
	},
	responses: createApiResponse(InviteSchema, 'Success'),
});

inviteRegistery.registerPath({
	method: 'get',
	path: '/invites/{id}',
	tags: ['Invite'],
	security: [{ [bearerAuth.name]: [] }],
	request: {
		params: GetInviteSchema.shape.params,
	},
	responses: createApiResponse(InviteSchema, 'Success'),
});

inviteRegistery.registerPath({
	method: 'patch',
	path: '/invites/{id}',
	tags: ['Invite'],
	security: [{ [bearerAuth.name]: [] }],
	request: {
		body: {
			content: {
				'application/json': {
					schema: UpdateInviteSchema.shape.body,
				},
			},
		},
		params: UpdateInviteSchema.shape.params,
	},
	responses: createApiResponse(messageResponse, 'Success'),
});

inviteRegistery.registerPath({
	method: 'patch',
	path: '/invites/{id}/acceptInvite',
	tags: ['Invite'],
	security: [{ [bearerAuth.name]: [] }],
	request: {
		params: GetInviteSchema.shape.params,
	},
	responses: createApiResponse(messageResponse, 'Success'),
});

inviteRegistery.registerPath({
	method: 'patch',
	path: '/invites/{id}/cancelInvite',
	tags: ['Invite'],
	security: [{ [bearerAuth.name]: [] }],
	request: {
		params: GetInviteSchema.shape.params,
	},
	responses: createApiResponse(messageResponse, 'Success'),
});

inviteRegistery.registerPath({
	method: 'delete',
	path: '/invites/{id}',
	tags: ['Invite'],
	security: [{ [bearerAuth.name]: [] }],
	request: {
		params: DeleteInviteSchema.shape.params,
	},
	responses: createApiResponse(messageResponse, 'Success'),
});
