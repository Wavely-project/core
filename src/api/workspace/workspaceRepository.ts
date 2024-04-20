import { CreateWorkspaceDto, Workspace } from '@/api/workspace/workspaceModel';

import db from '../../../db/db';

export const workspaceRepository = {
	createWorkspace: async (trx: any, workspace: CreateWorkspaceDto): Promise<Workspace> => {
		const ids = await trx('workspaces').insert(workspace);
		const newWorkspace = await trx('workspaces').where('id', ids[0]).first();
		return newWorkspace;
	},
	findAll: async (): Promise<Workspace[]> => {
		return await db.select('*').from('workspaces');
	},
	findAllUserWorkspaces: async (userId: number): Promise<Workspace[]> => {
		return await db.select('*').from('workspaces').where('ownerId', userId);
	},

	findById: async (id: number): Promise<Workspace | null> => {
		return await db.select('*').from('workspaces').where('id', id).first();
	},
	deleteWorkspace: async (trx: any, id: number): Promise<void> => {
		await trx('workspaces').where('id', id).delete();
	},
};
