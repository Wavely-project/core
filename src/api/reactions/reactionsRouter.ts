import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Router } from 'express';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { messageResponse } from '@/common/utils/commonResponses';

import { validateRequest } from '../../common/utils/httpHandlers';
import {
	CreateReactionSchema,
	DeleteReactionSchema,
	ReactionSchema,
} from './reactionModel';
import reactionsController from './reactionsController';

export const reactionsRegistry = new OpenAPIRegistry();
reactionsRegistry.register('Reactions', ReactionSchema);

export const reactionsRouter: Router = (() => {
	const router = express.Router();

	reactionsRegistry.registerPath({
		method: 'get',
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

	router.post(
		'/add',
		validateRequest(CreateReactionSchema),
		reactionsController.add
	);

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

	router.delete(
		'/delete',
		validateRequest(DeleteReactionSchema),
		reactionsController.delete
	);

	return router;
})();
