import { Coworker, CreateCoworkerDto } from '@/api/coworkers/coworkersModel';

export const coworkerRepository = {
	createCoworker: async (trx: any, coworker: CreateCoworkerDto): Promise<Coworker> => {
		const ids = await trx.insert(coworker).into('coworkers');
		return await trx.select('*').from('coworkers').where('id', ids[0]).first();
	},
	getAllUserWorkspaces: async (trx: any, userId: number): Promise<Coworker[]> => {
		return await trx.select('*').from('coworkers').where('userId', userId);
	},
	getAllWorkspaceUsers: async (trx: any, workspaceId: number): Promise<Coworker[]> => {
		return await trx.select('*').from('coworkers').where('workspaceId', workspaceId);
	},
	removeCoworker: async (trx: any, userId: number, workspaceId: number): Promise<void> => {
		return await trx.delete().from('coworkers').where('userId', userId).where('workspaceId', workspaceId);
	},
};
