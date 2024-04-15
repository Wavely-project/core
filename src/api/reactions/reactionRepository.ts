import { CreateReactionDto, Reaction } from '@/api/reactions/reactionModel';

import db from '../../../db/db';

export const reactionRepository = {
	addReaction: async (reaction: CreateReactionDto): Promise<Reaction> => {
		const ids = await db('reactions').insert(reaction);
		const newReaction = await db('reactions').where('id', ids[0]).first();
		return newReaction;
	},
	getReactionById: async (id: number): Promise<Reaction> => {
		return await db('reactions').where('id', id).first();
	},
	getAllMessageReactions: async (messageId: number): Promise<Reaction[]> => {
		return await db.select('*').from('reactions').where('messageId', messageId);
	},
	updateReaction: async (id: number, reaction: CreateReactionDto): Promise<Reaction> => {
		await db('reactions').where('id', id).update(reaction);
		const updatedReaction = await db('reactions').where('id', id).first();
		return updatedReaction;
	},
	deleteReaction: async (id: number): Promise<void> => {
		await db('reactions').where('id', id).delete();
	},
};
