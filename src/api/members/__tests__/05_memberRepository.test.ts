import db from '../../../../db/db';
import EntityFactory from '../../../common/__tests__/entityFactory';
import { memberRepository } from '../memberRepository';

describe('memberRepository', () => {
	let trx: any;
	beforeAll(async () => {
		trx = await db.transaction();
		await trx.schema.alterTable('members', (table: any) => {
			table.dropForeign('userId');
			table.dropForeign('channelId');
		});

		await Promise.all([
			EntityFactory.createMember(1, 1),
			EntityFactory.createMember(1, 2),
			EntityFactory.createMember(2, 1),
			EntityFactory.createMember(2, 3),
		]);
	});
	afterEach(async () => {
		await trx.rollback();
	});

	test('createMember', async () => {
		trx = await db.transaction();
		await memberRepository.createMember(trx, { userId: 3, channelId: 3 });
		const members = await trx('members').where('userId', 3).andWhere('channelId', 3);
		expect(members).toHaveLength(1);
		// await EntityFactory.deleteMembers(3, 3);
	});

	test('getAllUserChannels', async () => {
		const members = await memberRepository.getAllUserChannels(1);
		expect(members).toHaveLength(2);
	});
	test('getAllChannelUsers', async () => {
		const members = await memberRepository.getAllChannelUsers(3);
		expect(members).toHaveLength(1);
	});
	test('removeMember', async () => {
		trx = await db.transaction();
		await memberRepository.removeMember(trx, 1, 1);
		const members = await trx('members').where('userId', 1);
		expect(members).toHaveLength(1);
	});

	afterAll(async () => {
		trx = await db.transaction();
		await Promise.all([
			EntityFactory.deleteMembers(1, 1),
			EntityFactory.deleteMembers(1, 2),
			EntityFactory.deleteMembers(2, 1),
			EntityFactory.deleteMembers(2, 3),
		]);

		await trx.schema.alterTable('members', (table: any) => {
			table.foreign('userId').references('id').inTable('users');
			table.foreign('channelId').references('id').inTable('channels');
		});
	});
});
