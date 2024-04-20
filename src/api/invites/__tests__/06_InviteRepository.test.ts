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
			EntityFactory.createInvite(1, 1, 1, 1, 'pending'),
			EntityFactory.createInvite(2, 1, 2, 1, 'pending'),
			EntityFactory.createInvite(3, 2, 3, 3, 'pending'),
			EntityFactory.createInvite(4, 2, 3, 3, 'pending'),
		]);
	});
	afterEach(async () => {
		await trx.rollback();
	});
	test('createInvite', async () => {
		trx = await db.transaction();
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

		// await EntityFactory.deleteInvites([invite.id]);
	});

	test('getInviteById', async () => {
		const invite = await invitesRepository.getInviteById('1');
		expect(invite).not.toBeNull();
	});

	test('getInviteByWorkspaceId', async () => {
		const invites = await invitesRepository.getInviteByWorkspaceId('1');
		expect(invites).toHaveLength(2);
	});

	test('acceptInvite', async () => {
		await invitesRepository.acceptInvite('1');
		const invite = await db('invites').where('id', 1).first();
		expect(invite.status).toBe('accepted');
	});

	test('cancelInvite', async () => {
		await invitesRepository.cancelInvite('1');
		const invite = await db('invites').where('id', 1).first();
		expect(invite.status).toBe('cancelled');
	});

	afterAll(async () => {
		trx = await db.transaction();
		await EntityFactory.deleteInvites([1, 2, 3, 4]);
		await trx.schema.alterTable('invites', (table: any) => {
			table.foreign('workspaceId').references('id').inTable('workspaces'); //TODO: activate this
			table.foreign('inviteeId').references('id').inTable('users');
			table.foreign('senderId').references('id').inTable('users');
		});
	});
});
