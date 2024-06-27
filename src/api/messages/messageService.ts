import { Knex } from 'knex';

import { CreateMessage, UpdateMessage } from './messageModel';
import { messageRepository } from './messageRepository';

export function getChannelMessages(
	channelId: number,
	cursor: number,
	limit: number,
	trx: Knex.Transaction
) {
	return messageRepository.getChannelMessages(channelId, cursor, limit, trx);
}

export function getMessageById(messageId: number, trx: Knex.Transaction) {
	return messageRepository.getMessageById(messageId, trx);
}
export function sendMessage(message: CreateMessage, trx: Knex.Transaction) {
	return messageRepository.sendMessage(message, trx);
}
export function editMessage(
	messageId: number,
	message: UpdateMessage,
	trx: Knex.Transaction
) {
	return messageRepository.editMessage(messageId, message, trx);
}
export function deleteMessage(messageId: number, trx: Knex.Transaction) {
	return messageRepository.deleteMessage(messageId, trx);
}

// export function getChannelThreads(
// 	userId: number,
// 	channelId: number,
// 	trx: Knex.Transaction
// ) {
// }
