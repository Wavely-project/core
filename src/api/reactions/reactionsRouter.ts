import express, { Router } from 'express';

import { validateRequest } from '../../common/utils/httpHandlers';
import ReactionController from './reactionController';
import { CreateReactionSchema, DeleteReactionSchema } from './reactionModel';

export const reactionsRouter: Router = (() => {
	const router = express.Router();
	router.post(
		'/add',
		validateRequest(CreateReactionSchema),
		ReactionController.add
	);
	router.delete(
		'/delete',
		validateRequest(DeleteReactionSchema),
		ReactionController.delete
	);

	router.patch(
		'/update',
		validateRequest(CreateReactionSchema),
		ReactionController.update
	);

	return router;
})();
