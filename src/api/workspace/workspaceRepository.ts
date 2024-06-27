import { Knex } from 'knex';

import {
	CreateWorkspace,
	UpdateWorkspace,
	Workspace,
} from '@/api/workspace/workspaceModel';

export const workspaceRepository = {
	create: async (
		workspace: CreateWorkspace,
		trx: Knex.Transaction
	): Promise<Workspace> => {
		const ids = await trx.insert(workspace).into('workspaces');
		return trx.select('*').from('workspaces').where('id', ids[0]).first();
	},
	update: async (
		workspaceId: number,
		workspace: UpdateWorkspace,
		trx: Knex.Transaction
	): Promise<Workspace> => {
		await trx.update(workspace).where('id', workspaceId).from('workspaces');
		return trx
			.select('*')
			.from('workspaces')
			.where('id', workspaceId)
			.first();
	},
	getByIds: (
		workspaceIds: number[],
		trx: Knex.Transaction
	): Promise<Workspace[]> => {
		return trx.select('*').from('workspaces').whereIn('id', workspaceIds);
	},
	getById: (id: number, trx: Knex.Transaction): Promise<Workspace | null> => {
		return trx.select('*').from('workspaces').where('id', id).first();
	},
	delete: (id: number, trx: Knex.Transaction): Promise<number> => {
		return trx.delete().from('workspaces').where('id', id);
	},
};
