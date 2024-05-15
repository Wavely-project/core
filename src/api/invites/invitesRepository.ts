import { CreateInviteDto, Invite } from './invitesModel';

const invitesRepository = {
	createInvite: async (
		trx: any,
		invite: CreateInviteDto
	): Promise<Invite> => {
		const ids = await trx.insert(invite).into('invites');
		return await trx
			.select('*')
			.from('invites')
			.where('id', ids[0])
			.first();
	},
	getInviteById: async (trx: any, id: string): Promise<Invite | null> => {
		return await trx.select('*').from('invites').where('id', id).first();
	},
	getInviteByWorkspaceId: async (
		trx: any,
		workspaceId: string
	): Promise<Invite[]> => {
		return await trx
			.select('*')
			.from('invites')
			.where('workspaceId', workspaceId)
			.andWhere('status', 'pending');
	},
	acceptInvite: async (trx: any, id: string): Promise<void> => {
		return await trx
			.update({ status: 'accepted' })
			.from('invites')
			.where('id', id);
	},
	cancelInvite: async (trx: any, id: string): Promise<void> => {
		return await trx
			.update({ status: 'cancelled' })
			.from('invites')
			.where('id', id);
	},
};

export default invitesRepository;
