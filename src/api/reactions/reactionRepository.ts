import { CreateReactionDto, Reaction } from '@/api/reactions/reactionModel';

import db from '../../../db/db';

export const reactionRepository = {
	addReaction: async (reaction: CreateReactionDto, trx?: any): Promise<Reaction> => {
		trx = trx ? trx : db;
		const ids = await trx('reactions').insert(reaction);
		const newReaction = await trx('reactions').where('id', ids[0]).first();
		return newReaction;
	},

	getMessageReactions: async (messageId: number, trx?: any): Promise<Reaction[]> => {
		trx = trx ? trx : db;
		return await trx.select('*').from('reactions').where('messageId', messageId);
	},
	deleteReaction: async (id: number, trx?: any): Promise<void> => {
		trx = trx ? trx : db;
		await trx('reactions').where('id', id).delete();
	},
};
