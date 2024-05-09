import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Router } from 'express';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';

import { validateRequest } from '../../common/utils/httpHandlers';
import { CreateReactionSchema, ReactionSchema, RemoveReactionSchema } from './reactionModel';
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
					'application/json': { schema: CreateReactionSchema.shape.body },
				},
			},
		},
		responses: createApiResponse(ReactionSchema, 'Success'),
	});

	router.post('/add', validateRequest(CreateReactionSchema), reactionsController.add);

	reactionsRegistry.registerPath({
		method: 'patch',
		path: '/reactions/delete',
		tags: ['Reactions'],
		request: {
			body: {
				content: {
					'application/json': { schema: CreateReactionSchema.shape.body },
				},
			},
		},
		responses: createApiResponse(ReactionSchema, 'Success'),
	});

	router.delete('/delete', validateRequest(RemoveReactionSchema), reactionsController.delete);

	return router;
})();
