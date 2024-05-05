import db from 'db/db';

import { CreateInviteDto, Invite } from './invitesModel';

const invitesRepository = {
	createInvite: async (invite: CreateInviteDto, trx?: any): Promise<Invite> => {
		trx = trx ? trx : db;

		const ids = await trx.insert(invite).into('invites');
		return await trx.select('*').from('invites').where('id', ids[0]).first();
	},
	getInviteById: async (id: string, trx?: any): Promise<Invite | null> => {
		trx = trx ? trx : db;

		return await trx.select('*').from('invites').where('id', id).first();
	},
	getWorkspaceInvites: async (workspaceId: string, trx?: any): Promise<object> => {
		trx = trx ? trx : db;
		const invites = await trx
			.select('*')
			.from('invites')
			.where('workspaceId', workspaceId)
			.andWhere('status', 'pending');
		const invitedEmails = invites.map((invite: any) => invite.inviteeEmail);
		const dublicateMails = invitedEmails.filter(
			(inviteeEmail: string, index: number) => invitedEmails.indexOf(inviteeEmail) !== index
		);
		return { invites, invitedEmails, dublicateMails };
	},
	acceptInvite: async (id: string, trx?: any): Promise<void> => {
		trx = trx ? trx : db;

		return await trx.update({ status: 'accepted' }).from('invites').where('id', id);
	},
	cancelInvite: async (id: string, trx?: any): Promise<void> => {
		trx = trx ? trx : db;

		return await trx.update({ status: 'cancelled' }).from('invites').where('id', id);
	},
	getInvitebyEmail: async (email: string, trx?: any): Promise<Invite | null> => {
		trx = trx ? trx : db;

		return await trx.select('*').from('invites').where('inviteeEmail', email).first();
	},
};

export default invitesRepository;
