import { CreateMessageDto, Message } from '@/api/messages/messageModel';

import db from '../../../db/db';

export const messageRepository = {
	sendMessage: async (message: CreateMessageDto, trx?: any): Promise<Message> => {
		trx = trx ? trx : db;
		const ids = await trx('messages').insert(message);
		const newMessage = await trx('messages').where('id', ids[0]).first();
		return newMessage;
	},
	getMessageById: async (id: number, trx?: any): Promise<Message> => {
		trx = trx ? trx : db;
		return await trx('messages').where('id', id).first();
	},
	getAllChannelMessages: async (channelId: number, cursor: any, limit: any, trx?: any): Promise<object> => {
		trx = trx ? trx : db;
		limit = parseInt(limit) || 10;
		cursor = parseInt(cursor) || 0;
		const messages = await trx
			.select('*')
			.from('messages')
			.where('channelId', channelId)
			.andWhere('id', '>', cursor)
			.limit(limit + 1);
		let hasNextPage = false;
		if (messages.length > limit) {
			hasNextPage = true;
			messages.pop();
		}
		return { data: messages, hasNextPage };
	},
	getAllUserMessages: async (userId: number, channelId: number, trx?: any): Promise<Message[]> => {
		trx = trx ? trx : db;
		return await trx.select('*').from('messages').where('userId', userId).andWhere('channelId', channelId);
	},
	editMessage: async (id: number, message: CreateMessageDto, trx?: any): Promise<Message> => {
		trx = trx ? trx : db;
		await trx('messages').where('id', id).update(message);
		const updatedMessage = await trx('messages').where('id', id).first();
		return updatedMessage;
	},
	deleteMessage: async (id: number, trx?: any): Promise<void> => {
		trx = trx ? trx : db;
		await trx('messages').where('id', id).delete();
	},
	getChannelThreads: async (channelId: number, trx?: any): Promise<Message[]> => {
		trx = trx ? trx : db;
		return await trx.select('*').from('messages').whereNotNull('parentMessageId').andWhere('channelId', channelId);
	},
};
