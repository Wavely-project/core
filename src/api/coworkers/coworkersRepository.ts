import { Knex } from 'knex';

import { Coworker, CreateCoworkerDto } from '@/api/coworkers/coworkersModel';

export const coworkerRepository = {
	createCoworker: async (
		coworker: CreateCoworkerDto,
		trx: Knex.Transaction
	): Promise<Coworker> => {
		const ids = await trx.insert(coworker).into('coworkers');
		return trx.select('*').from('coworkers').where('id', ids[0]).first();
	},
	getWorkspacesIds: (
		userId: number,
		trx: Knex.Transaction
	): Promise<Coworker[]> => {
		return trx.select('*').from('coworkers').where('userId', userId);
	},
	getUsersIds: (
		workspaceId: number,
		cursor: number,
		limit: number,
		trx: Knex.Transaction
	): Promise<Coworker[]> => {
		return trx
			.select('*')
			.from('coworkers')
			.where('workspaceId', workspaceId)
			.andWhere('id', '>', cursor)
			.limit(limit);
	},
	removeCoworker: (
		userId: number,
		workspaceId: number,
		trx: Knex.Transaction
	): Promise<number> => {
		return trx
			.delete()
			.from('coworkers')
			.where('userId', userId)
			.where('workspaceId', workspaceId);
	},
};
