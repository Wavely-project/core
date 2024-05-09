import { Request, Response } from 'express';

import { CreateMessage } from './messageModel';
import { messageRepository } from './messageRepository';

const MessageController = {
	getChannelMessages: async (req: Request, res: Response) => {
		const channelId = parseInt(req.params.id);
		const { cursor, limit } = req.query;
		console.log(cursor, ' ', limit);
		const messages = await messageRepository.getAllChannelMessages(channelId);
		res.json(messages);
	},
	getMessageById: async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		res.json({ id });
	},
	sendMessage: async (req: Request, res: Response) => {
		const { content, channelId, parentMessageId } = req.body;

		const createMessagePayload: CreateMessage = {
			content,
			channelId,
			senderId: res.locals.user.id,
			parentMessageId,
		};
		res.json(createMessagePayload);
	},
	updateMessage: async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		const { content } = req.body;
		res.json({ id, content });
	},
	deleteMessage: async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		res.json({ id });
	},
	getChannelThreads: async (req: Request, res: Response) => {
		const channelId = parseInt(req.params.id);
		res.json({ channelId });
	},
};

export default MessageController;
