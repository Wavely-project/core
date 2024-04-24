import db from '../../../../db/db';
import EntityFactory from '../../../common/__tests__/entityFactory';
import invitesRepository from '../invitesRepository';

describe('inviteRepository', () => {
	let trx: any;
	beforeAll(async () => {
		trx = await db.transaction();
		await trx.schema.alterTable('invites', (table: any) => {
			table.dropForeign('workspaceId'); //TODO: activate this
			table.dropForeign('inviteeId');
			table.dropForeign('senderId');
		});
		await Promise.all([
			EntityFactory.createInvite(trx, 1, 1, 1, 1, 'pending'),
			EntityFactory.createInvite(trx, 2, 1, 2, 1, 'pending'),
			EntityFactory.createInvite(trx, 3, 2, 3, 3, 'pending'),
			EntityFactory.createInvite(trx, 4, 2, 3, 3, 'pending'),
		]);
	});

	test('createInvite', async () => {
		const invite = await invitesRepository.createInvite(trx, {
			senderId: 1,
			inviteeId: 2,
			workspaceId: 4,
			status: 'pending',
			expiresAt: new Date(),
		});
		expect(invite.id).not.toBeNull();

		const selectAll = await trx.select('*').from('invites');
		expect(selectAll).toHaveLength(5);

		await EntityFactory.deleteInvites(trx, [invite.id]);
	});

	test('getInviteById', async () => {
		const invite = await invitesRepository.getInviteById(trx, '1');
		expect(invite).not.toBeNull();
	});

	test('getInviteByWorkspaceId', async () => {
		const invites = await invitesRepository.getInviteByWorkspaceId(trx, '1');
		expect(invites).toHaveLength(2);
	});

	test('acceptInvite', async () => {
		await invitesRepository.acceptInvite(trx, '1');
		const invite = await trx('invites').where('id', 1).first();
		expect(invite.status).toBe('accepted');
	});

	test('cancelInvite', async () => {
		await invitesRepository.cancelInvite(trx, '1');
		const invite = await trx('invites').where('id', 1).first();
		expect(invite.status).toBe('cancelled');
	});

	afterAll(async () => {
		await EntityFactory.deleteInvites(trx, [1, 2, 3, 4]);
		await trx.schema.alterTable('invites', (table: any) => {
			table.foreign('workspaceId').references('id').inTable('workspaces'); //TODO: activate this
			table.foreign('inviteeId').references('id').inTable('users');
			table.foreign('senderId').references('id').inTable('users');
		});
		trx.commit();
	});
});
