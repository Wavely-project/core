import { CreateWorkspaceDto, Workspace } from '@/api/workspace/workspaceModel';

import db from '../../../db/db';

export const workspaceRepository = {
	createWorkspace: async (workspace: CreateWorkspaceDto): Promise<Workspace> => {
		const ids = await db('workspaces').insert(workspace);
		const newWorkspace = await db('workspaces').where('id', ids[0]).first();
		return newWorkspace;
	},
	findAll: async (): Promise<Workspace[]> => {
		return await db.select('*').from('workspaces');
	},

	findById: async (id: number): Promise<Workspace | null> => {
		return await db.select('*').from('workspaces').where('id', id).first();
	},
};
