import { Knex } from 'knex';

import { Coworker } from './coworkersModel';
import { coworkerRepository } from './coworkersRepository';

const coworkersService = {
	getUserWorkspaces: async (userId: number, trx: Knex.Transaction) => {
		const rows = await coworkerRepository.getWorkspacesIds(userId, trx);
		return rows.map((row: Coworker) => row.workspaceId);
	},
};

export default coworkersService;
