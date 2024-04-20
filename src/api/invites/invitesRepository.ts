import db from '../../../db/db';
import { CreateInviteDto, Invite } from './invitesModel';

const invitesRepository = {
	createInvite: async (trx: any, invite: CreateInviteDto): Promise<Invite> => {
		const ids = await trx('invites').insert(invite);
		const newInvite = await trx('invites').where('id', ids[0]).first();
		return newInvite;
	},
	getInviteById: async (id: string): Promise<Invite | null> => {
		return await db.select('*').from('invites').where('id', id).first();
	},
	getInviteByWorkspaceId: async (workspaceId: string): Promise<Invite[]> => {
		return await db.select('*').from('invites').where('workspaceId', workspaceId).andWhere('status', 'pending');
	},
	acceptInvite: async (id: string): Promise<void> => {
		await db('invites').where('id', id).update({ status: 'accepted' });
	},
	cancelInvite: async (id: string): Promise<void> => {
		await db('invites').where('id', id).update({ status: 'cancelled' });
	},
};

export default invitesRepository;
