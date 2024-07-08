import { Request, Response } from 'express';

import {
	asyncHandler,
	handleServiceResponse,
} from '@/common/utils/httpHandlers';

import * as ReactionService from './reactionService';
const ReactionController = {
	getReactionsByMessageId: asyncHandler(
		async (req: Request, res: Response) => {
			const messageId = parseInt(req.params.id);
			const reactions = await ReactionService.getReactionsByMessageId(
				messageId,
				res.trx
			);
			handleServiceResponse(res, reactions, 'ok');
		}
	),
	add: asyncHandler(async (req: Request, res: Response) => {
		const { userId, messageId, reaction } = req.body;
		const addReactionDto = {
			userId,
			messageId,
			reaction,
		};
		const react = await ReactionService.addReaction(
			addReactionDto,
			res.trx
		);
		handleServiceResponse(res, react, 'ok');
	}),
	delete: asyncHandler(async (req: Request, res: Response) => {
		const { userId, messageId, reaction } = req.body;
		const deleteReactionDto = {
			userId,
			messageId,
			reaction,
		};
		await ReactionService.deleteReaction(deleteReactionDto, res.trx);
		handleServiceResponse(res, '', 'ok');
	}),
	update: asyncHandler(async (req: Request, res: Response) => {
		const { userId, messageId, reaction } = req.body;
		const updateReactionDto = {
			userId,
			messageId,
			reaction,
		};
		const updatedReaction = await ReactionService.updateReaction(
			userId,
			updateReactionDto,
			res.trx
		);
		handleServiceResponse(res, updatedReaction, 'ok');
	}),
};

export default ReactionController;
