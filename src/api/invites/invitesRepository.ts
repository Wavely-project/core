import { Knex } from 'knex';

import { CreateInviteDto, Invite } from './invitesModel';

const invitesRepository = {
	createInvite: async (
		invite: CreateInviteDto,
		trx: Knex.Transaction
	): Promise<Invite | string> => {
		//check if user is already invited to the workspace
		const check = await trx('invites')
			.where('inviteeEmail', invite.inviteeEmail)
			.andWhere('workspaceId', invite.workspaceId)
			.andWhere('status', 'pending')
			.first();
		if (check) {
			return check;
		}

		//check if this user is already a member of the workspace
		const invitee = await trx('users')
			.where('email', invite.inviteeEmail)
			.first();
		const coworker = await trx('coworkers')
			.where('userId', invitee.id)
			.andWhere('workspaceId', invite.workspaceId)
			.first();
		if (coworker) {
			return 'User is already a member of the workspace';
		}
		const ids = await trx.insert(invite).into('invites');
		console.log(ids);
		return await trx
			.select('*')
			.from('invites')
			.where('id', ids[0])
			.first();
	},
	getInviteById: async (
		id: string,
		trx: Knex.Transaction
	): Promise<Invite | null> => {
		return await trx.select('*').from('invites').where('id', id).first();
	},
	getInviteByWorkspaceId: async (
		workspaceId: string,
		trx: Knex.Transaction
	): Promise<Invite[]> => {
		return await trx
			.select('*')
			.from('invites')
			.where('workspaceId', workspaceId);
	},
	updateInvite: async (
		id: string,
		status: string,
		trx: Knex.Transaction
	): Promise<Invite> => {
		await trx('invites').where('id', id).update({ status });
		const updatedInvite = await trx('invites').where('id', id).first();
		return updatedInvite;
	},
	acceptInvite: async (id: string, trx: Knex.Transaction): Promise<void> => {
		await trx
			.update({ status: 'accepted' })
			.from('invites')
			.where('id', id);
		//user gets added to the workspace after accepting the invite
	},
	cancelInvite: async (id: string, trx: Knex.Transaction): Promise<void> => {
		await trx
			.update({ status: 'cancelled' })
			.from('invites')
			.where('id', id);
	},
	deleteInvite: async (id: string, trx: Knex.Transaction): Promise<void> => {
		await trx.delete().from('invites').where('id', id);
	},
};

export default invitesRepository;
