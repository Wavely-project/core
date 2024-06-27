import { Request, Response } from 'express';

import {
	asyncHandler,
	handleServiceResponse,
} from '@/common/utils/httpHandlers';

import { CreateMessage } from './messageModel';
import * as messageService from './messageService';

const MessageController = {
	getChannelMessages: asyncHandler(async (req: Request, res: Response) => {
		const channelId = parseInt(req.params.id);
		const cursor = parseInt((req.query.cursor || '0').toString());
		const limit = parseInt((req.query.limit || '10').toString());

		const messages = await messageService.getChannelMessages(
			channelId,
			cursor,
			limit,
			res.trx
		);

		handleServiceResponse(res, messages, 'ok');
	}),

	getMessageById: asyncHandler(async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		const message = await messageService.getMessageById(id, res.trx);
		handleServiceResponse(res, message, 'ok');
	}),

	sendMessage: asyncHandler(async (req: Request, res: Response) => {
		const { content, channelId, parentMessageId } = req.body;

		const createMessagePayload: CreateMessage = {
			content,
			channelId,
			senderId: res.locals.user.id,
			parentMessageId,
		};

		const message = await messageService.sendMessage(
			createMessagePayload,
			res.trx
		);
		// TODO: call service to distripute message??

		handleServiceResponse(res, message, 'ok');
	}),

	editMessage: asyncHandler(async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);

		// TODO: call service to update message??
		const message = await messageService.editMessage(id, req.body, res.trx);
		handleServiceResponse(res, message, 'ok');
	}),

	deleteMessage: asyncHandler(async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		// TODO: call service to delete message??
		await messageService.deleteMessage(id, res.trx);
		handleServiceResponse(res, null, 'ok');
	}),

	getChannelThreads: asyncHandler(async (req: Request, res: Response) => {
		const channelId = parseInt(req.params.id);
		res.json({ channelId });
	}),
};

export default MessageController;
