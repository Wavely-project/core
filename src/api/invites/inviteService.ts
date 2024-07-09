import { Knex } from 'knex';

import { CreateInviteDto } from './invitesModel';
import invitesRepository from './invitesRepository';

export function sendInvite(invite: CreateInviteDto, trx: Knex.Transaction) {
	return invitesRepository.createInvite(invite, trx);
}

export function getInviteById(id: string, trx: Knex.Transaction) {
	return invitesRepository.getInviteById(id, trx);
}

export function getInviteByWorkspaceId(
	workspaceId: string,
	trx: Knex.Transaction
) {
	return invitesRepository.getInviteByWorkspaceId(workspaceId, trx);
}
export function updateInvite(
	id: string,
	status: string,
	trx: Knex.Transaction
) {
	return invitesRepository.updateInvite(id, status, trx);
}
export function acceptInvite(id: string, trx: Knex.Transaction) {
	return invitesRepository.acceptInvite(id, trx);
}

export function cancelInvite(id: string, trx: Knex.Transaction) {
	return invitesRepository.cancelInvite(id, trx);
}

export function deleteInvite(id: string, trx: Knex.Transaction) {
	return invitesRepository.deleteInvite(id, trx);
}
