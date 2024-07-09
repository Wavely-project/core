import { Knex } from 'knex';

import { CreateReactionDto, deleteReactionDto } from './reactionModel';
import { ReactionRepository } from './reactionRepository';

export function addReaction(
	reaction: CreateReactionDto,
	trx: Knex.Transaction
) {
	return ReactionRepository.addReaction(reaction, trx);
}
export function getReactionsByMessageId(
	messageId: number,
	trx: Knex.Transaction
) {
	return ReactionRepository.getReactionsByMessageId(messageId, trx);
}
export function deleteReaction(
	deleteReactionDto: deleteReactionDto,
	trx: Knex.Transaction
) {
	return ReactionRepository.deleteReaction(deleteReactionDto, trx);
}
export function updateReaction(
	id: number,
	reaction: CreateReactionDto,
	trx: Knex.Transaction
) {
	return ReactionRepository.updateReaction(id, reaction, trx);
}

// export function getChannelMessages(
// 	channelId: number,
// 	cursor: number,
// 	limit: number,
// 	trx: Knex.Transaction
// ) {
// 	return messageRepository.getChannelMessages(channelId, cursor, limit, trx);
// }

// export function getMessageById(messageId: number, trx: Knex.Transaction) {
// 	return messageRepository.getMessageById(messageId, trx);
// }
// export function sendMessage(message: CreateMessage, trx: Knex.Transaction) {
// 	return messageRepository.sendMessage(message, trx);
// }
// export function editMessage(
// 	messageId: number,
// 	message: UpdateMessage,
// 	trx: Knex.Transaction
// ) {
// 	return messageRepository.editMessage(messageId, message, trx);
// }
// export function deleteMessage(messageId: number, trx: Knex.Transaction) {
// 	return messageRepository.deleteMessage(messageId, trx);
// }

// export function getChannelThreads(
// 	userId: number,
// 	channelId: number,
// 	trx: Knex.Transaction
// ) {
// }
