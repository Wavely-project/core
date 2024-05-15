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
	getUserIds: (
		workspaceId: number,
		trx: Knex.Transaction
	): Promise<Coworker[]> => {
		return trx
			.select('*')
			.from('coworkers')
			.where('workspaceId', workspaceId);
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
