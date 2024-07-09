import { Knex } from 'knex';

import {
	CreateReactionDto,
	deleteReactionDto,
	Reaction,
} from '@/api/reactions/reactionModel';

export const ReactionRepository = {
	addReaction: async (
		reaction: CreateReactionDto,
		trx: Knex.Transaction
	): Promise<Reaction> => {
		//check if the user has already reacted to the message if yes update the reaction
		const react = await trx('reactions')
			.where('messageId', reaction.messageId)
			.andWhere('userId', reaction.userId)
			.first();

		if (react) {
			await trx('reactions')
				.where('messageId', reaction.messageId)
				.andWhere('userId', reaction.userId)
				.update(reaction);
			const updatedReaction = await trx('reactions')
				.where('messageId', reaction.messageId)
				.andWhere('userId', reaction.userId)
				.first();
			return updatedReaction;
		}
		const ids = await trx('reactions').insert(reaction);
		const newReaction = await trx('reactions').where('id', ids[0]).first();
		return newReaction;
	},
	updateReaction: async (
		id: number,
		reaction: CreateReactionDto,
		trx: Knex.Transaction
	): Promise<Reaction> => {
		await trx('reactions').where('id', id).update(reaction);
		const updatedReaction = await trx('reactions').where('id', id).first();
		return updatedReaction;
	},

	getReactionsByMessageId: async (
		messageId: number,
		trx: Knex.Transaction
	): Promise<Reaction[]> => {
		return await trx
			.select('*')
			.from('reactions')
			.where('messageId', messageId);
	},

	deleteReaction: async (
		deleteReactionDto: deleteReactionDto,
		trx: Knex.Transaction
	): Promise<void> => {
		await trx('reactions')
			.where('messageId', deleteReactionDto.messageId)
			.andWhere('userId', deleteReactionDto.userId)
			.del();
	},
};
