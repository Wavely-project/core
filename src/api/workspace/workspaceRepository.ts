import db from 'db/db';

import { CreateWorkspaceDto, Workspace } from '@/api/workspace/workspaceModel';

export const workspaceRepository = {
	createWorkspace: async (workspace: CreateWorkspaceDto, trx?: any): Promise<Workspace> => {
		trx = trx ? trx : db;
		const ids = await trx.insert(workspace).into('workspaces');
		const newWorkspace = await trx.select('*').from('workspaces').where('id', ids[0]).first();
		return newWorkspace;
	},
	findAllUserWorkspaces: async (userId: number, trx?: any): Promise<Workspace[]> => {
		trx = trx ? trx : db;

		return await trx.select('*').from('workspaces').where('ownerId', userId);
	},

	findWorkspaceById: async (id: number, trx?: any): Promise<Workspace | null> => {
		trx = trx ? trx : db;

		return await trx.select('*').from('workspaces').where('id', id).first();
	},

	deleteWorkspace: async (id: number, trx?: any): Promise<void> => {
		trx = trx ? trx : db;

		return await trx.delete().from('workspaces').where('id', id);
	},
	updateWorkspace: async (id: number, workspace: CreateWorkspaceDto, trx?: any): Promise<Workspace> => {
		trx = trx ? trx : db;

		await trx.update(workspace).from('workspaces').where('id', id);
		const updatedWorkspace = await trx.select('*').from('workspaces').where('id', id).first();
		return updatedWorkspace;
	},
};
