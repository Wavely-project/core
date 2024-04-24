import { CreateWorkspaceDto, Workspace } from '@/api/workspace/workspaceModel';

export const workspaceRepository = {
	createWorkspace: async (trx: any, workspace: CreateWorkspaceDto): Promise<Workspace> => {
		const ids = await trx('workspaces').insert(workspace);
		const newWorkspace = await trx('workspaces').where('id', ids[0]).first();
		return newWorkspace;
	},
	findAllUserWorkspaces: async (trx: any, userId: number): Promise<Workspace[]> => {
		return await trx.select('*').from('workspaces').where('ownerId', userId);
	},

	findById: async (trx: any, id: number): Promise<Workspace | null> => {
		return await trx.select('*').from('workspaces').where('id', id).first();
	},
	deleteWorkspace: async (trx: any, id: number): Promise<void> => {
		await trx('workspaces').where('id', id).delete();
	},
};
