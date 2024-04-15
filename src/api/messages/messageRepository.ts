import { CreateMessageDto, Message } from '@/api/messages/messageModel';

import db from '../../../db/db';

export const messageRepository = {
	sendMessage: async (message: CreateMessageDto): Promise<Message> => {
		const ids = await db('messages').insert(message);
		const newMessage = await db('messages').where('id', ids[0]).first();
		return newMessage;
	},
	getMessageById: async (id: number): Promise<Message> => {
		return await db('messages').where('id', id).first();
	},
	getAllChannelMessages: async (channelId: number): Promise<Message[]> => {
		return await db.select('*').from('messages').where('channelId', channelId);
	},
	getAllUserMessages: async (userId: number, channelId: number): Promise<Message[]> => {
		return await db.select('*').from('messages').where('userId', userId).where('channelId', channelId);
	},
	editMessage: async (id: number, message: CreateMessageDto): Promise<Message> => {
		await db('messages').where('id', id).update(message);
		const updatedMessage = await db('messages').where('id', id).first();
		return updatedMessage;
	},
	deleteMessage: async (id: number): Promise<void> => {
		await db('messages').where('id', id).delete();
	},
};
