import db from '../../../../db/db';
import EntityFactory from '../../../common/__tests__/entityFactory';
import { memberRepository } from '../memberRepository';

describe('memberRepository', () => {
	beforeAll(async () => {
		await db.schema.alterTable('members', (table) => {
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

	test('createMember', async () => {
		await memberRepository.createMember({ userId: 3, channelId: 3 });
		const members = await db('members').where('userId', 3).andWhere('channelId', 3);
		expect(members).toHaveLength(1);
	});

	test('getAllUserChannels', async () => {
		const members = await memberRepository.getAllUserChannels(1);
		expect(members).toHaveLength(2);
	});
	test('getAllChannelUsers', async () => {
		const members = await memberRepository.getAllChannelUsers(3);
		expect(members).toHaveLength(2);
	});
	test('removeMember', async () => {
		await memberRepository.removeMember(1, 1);
		const members = await db('members').where('userId', 1);
		expect(members).toHaveLength(1);
	});

	afterAll(async () => {
		await Promise.all([
			EntityFactory.deleteMembers(1, 1),
			EntityFactory.deleteMembers(1, 2),
			EntityFactory.deleteMembers(2, 1),
			EntityFactory.deleteMembers(2, 3),
			EntityFactory.deleteMembers(3, 3),
		]);

		await db.schema.alterTable('members', (table) => {
			table.foreign('userId').references('id').inTable('users');
			table.foreign('channelId').references('id').inTable('channels');
		});
	});
});
