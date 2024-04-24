import { CreateInviteDto, Invite } from './invitesModel';

const invitesRepository = {
	createInvite: async (trx: any, invite: CreateInviteDto): Promise<Invite> => {
		const ids = await trx('invites').insert(invite);
		const newInvite = await trx('invites').where('id', ids[0]).first();
		return newInvite;
	},
	getInviteById: async (trx: any, id: string): Promise<Invite | null> => {
		return await trx.select('*').from('invites').where('id', id).first();
	},
	getInviteByWorkspaceId: async (trx: any, workspaceId: string): Promise<Invite[]> => {
		return await trx.select('*').from('invites').where('workspaceId', workspaceId).andWhere('status', 'pending');
	},
	acceptInvite: async (trx: any, id: string): Promise<void> => {
		await trx('invites').where('id', id).update({ status: 'accepted' });
	},
	cancelInvite: async (trx: any, id: string): Promise<void> => {
		await trx('invites').where('id', id).update({ status: 'cancelled' });
	},
};

export default invitesRepository;
