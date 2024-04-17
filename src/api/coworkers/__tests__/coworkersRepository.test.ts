import db from '../../../../db/db';
import EntityFactory from '../../../common/__tests__/entityFactory';
import { coworkerRepository } from '../coworkersRepository';
describe('coworkerRepository', () => {
	beforeAll(async () => {
		await db.schema.alterTable('coworkers', (table) => {
			table.dropForeign('userId');
			table.dropForeign('workspaceId');
		});

		await Promise.all([
			EntityFactory.createCoworker(1, 1),
			EntityFactory.createCoworker(1, 2),
			EntityFactory.createCoworker(2, 1),
			EntityFactory.createCoworker(2, 3),
		]);
	});

	test('createCoworker', async () => {
		await coworkerRepository.createCoworker({ userId: 3, workspaceId: 3 });
		const coworkers = await db('coworkers').where('userId', 3).andWhere('workspaceId', 3);
		expect(coworkers).toHaveLength(1);
	});

	test('getAllUserWorkspaces', async () => {
		const coworkers = await coworkerRepository.getAllUserWorkspaces(1);
		expect(coworkers).toHaveLength(2);
	});
	test('getAllWorkspaceUsers', async () => {
		const coworkers = await coworkerRepository.getAllWorkspaceUsers(3);
		expect(coworkers).toHaveLength(2);
	});
	test('removeCoworker', async () => {
		await coworkerRepository.removeCoworker(1, 1);
		const coworkers = await db('coworkers').where('userId', 1);
		expect(coworkers).toHaveLength(1);
	});

	afterAll(async () => {
		await Promise.all([
			EntityFactory.deleteCoworkers(1, 1),
			EntityFactory.deleteCoworkers(1, 2),
			EntityFactory.deleteCoworkers(2, 1),
			EntityFactory.deleteCoworkers(2, 3),
			EntityFactory.deleteCoworkers(3, 3),
		]);

		await db.schema.alterTable('coworkers', (table) => {
			table.foreign('userId').references('id').inTable('users');
			table.foreign('workspaceId').references('id').inTable('workspaces');
		});
	});
});
