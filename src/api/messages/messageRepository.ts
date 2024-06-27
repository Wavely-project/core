import { Knex } from 'knex';

import {
	CreateMessage,
	Message,
	UpdateMessage,
} from '@/api/messages/messageModel';

export const messageRepository = {
	sendMessage: async (
		message: CreateMessage,
		trx: Knex.Transaction
	): Promise<Message> => {
		const ids = await trx.insert(message).into('messages');
		return trx.select('*').from('messages').where('id', ids[0]).first();
	},

	getMessageById: (id: number, trx: Knex.Transaction): Promise<Message> => {
		return trx.select('*').from('messages').where('id', id).first();
	},

	getChannelMessages: (
		channelId: number,
		cursor: number,
		limit: number,
		trx: Knex.Transaction
	): Promise<Message[]> => {
		return trx
			.select('*')
			.from('messages')
			.where('channelId', channelId)
			.andWhere('id', '>', cursor)
			.limit(limit);
	},

	getAllUserMessages: (
		//TODO: do we need this?
		userId: number,
		channelId: number,
		trx: Knex.Transaction
	): Promise<Message[]> => {
		return trx
			.select('*')
			.from('messages')
			.where('userId', userId)
			.where('channelId', channelId);
	},

	editMessage: async (
		messageId: number,
		message: UpdateMessage,
		trx: Knex.Transaction
	): Promise<Message> => {
		await trx.update(message).where('id', messageId).from('messages');
		return trx.select('*').from('messages').where('id', messageId).first();
	},

	deleteMessage: (id: number, trx: Knex.Transaction) => {
		return trx.delete().from('messages').where('id', id);
	},
};
