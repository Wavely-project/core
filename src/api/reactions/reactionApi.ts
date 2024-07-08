import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { messageResponse } from '@/common/utils/commonResponses';

import { CreateReactionSchema, ReactionSchema } from './reactionModel';
export const reactionsRegistry = new OpenAPIRegistry();
reactionsRegistry.register('Reactions', ReactionSchema);
reactionsRegistry.registerPath({
	method: 'post',
	path: '/reactions/add',
	tags: ['Reactions'],
	request: {
		body: {
			content: {
				'application/json': {
					schema: CreateReactionSchema.shape.body,
				},
			},
		},
	},
	responses: createApiResponse(ReactionSchema, 'Success'),
});

reactionsRegistry.registerPath({
	method: 'delete',
	path: '/reactions/delete',
	tags: ['Reactions'],
	request: {
		body: {
			content: {
				'application/json': {
					schema: CreateReactionSchema.shape.body,
				},
			},
		},
	},
	responses: createApiResponse(messageResponse, 'Success'),
});
reactionsRegistry.registerPath({
	method: 'patch',
	path: '/reactions/update',
	tags: ['Reactions'],
	request: {
		body: {
			content: {
				'application/json': {
					schema: CreateReactionSchema.shape.body,
				},
			},
		},
	},
	responses: createApiResponse(ReactionSchema, 'Success'),
});
