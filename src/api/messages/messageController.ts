import { Request, Response } from 'express';

import { CreateMessage } from './messageModel';
import { messageRepository } from './messageRepository';

const MessageController = {
	getChannelMessages: async (req: Request, res: Response) => {
		const channelId = parseInt(req.params.id);
		const { cursor, limit } = req.query;
		const messages = await messageRepository.getAllChannelMessages(channelId, cursor, limit);
		res.json(messages);
	},
	getMessageById: async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		res.json({ id });
	},
	sendMessage: async (req: Request, res: Response) => {
		const { content, channelId, workspaceId, parentMessageId } = req.body;

		const createMessagePayload: CreateMessage = {
			content,
			channelId,
			workspaceId,
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
