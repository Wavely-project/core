import { CreateWorkspaceDto, Workspace } from '@/api/workspace/workspaceModel';

export const workspaceRepository = {
	createWorkspace: async (trx: any, workspace: CreateWorkspaceDto): Promise<Workspace> => {
		const ids = await trx.insert(workspace).into('workspaces');
		const newWorkspace = await trx.select('*').from('workspaces').where('id', ids[0]).first();
		return newWorkspace;
	},
	findAllUserWorkspaces: async (trx: any, userId: number): Promise<Workspace[]> => {
		return await trx.select('*').from('workspaces').where('ownerId', userId);
	},

	findById: async (trx: any, id: number): Promise<Workspace | null> => {
		return await trx.select('*').from('workspaces').where('id', id).first();
	},
	deleteWorkspace: async (trx: any, id: number): Promise<void> => {
		return await trx.delete().from('workspaces').where('id', id);
	},
};
