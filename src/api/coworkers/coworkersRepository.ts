import { Coworker, CreateCoworkerDto } from '@/api/coworkers/coworkersModel';

import db from '../../../db/db';

export const memberRepository = {
	createCoworker: async (coworker: CreateCoworkerDto): Promise<Coworker> => {
		const ids = await db('coworkers').insert(coworker);
		const newCoworker = await db('coworkers').where('id', ids[0]).first();
		return newCoworker;
	},
	getAllUserWorkspaces: async (userId: number): Promise<Coworker[]> => {
		return await db.select('*').from('coworkers').where('userId', userId);
	},
	getAllWorkspaceUsers: async (workspaceId: number): Promise<Coworker[]> => {
		return await db.select('*').from('coworkers').where('workspaceId', workspaceId);
	},
	removeCoworker: async (userId: number, workspaceId: number): Promise<void> => {
		await db('coworkers').where('userId', userId).where('channelId', workspaceId).delete();
	},
};
