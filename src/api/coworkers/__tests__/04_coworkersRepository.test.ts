import db from '../../../../db/db';
import EntityFactory from '../../../common/__tests__/entityFactory';
import { coworkerRepository } from '../coworkersRepository';
describe('coworkerRepository', () => {
	let trx: any;
	beforeAll(async () => {
		trx = await db.transaction();
		await trx.schema.alterTable('coworkers', (table: any) => {
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
	afterEach(async () => {
		await trx.rollback();
	});

	test('createCoworker', async () => {
		trx = await db.transaction();
		await coworkerRepository.createCoworker(trx, { userId: 3, workspaceId: 3 });
		const coworker = await trx('coworkers').where('userId', 3).andWhere('workspaceId', 3);
		expect(coworker).not.toBeNull();
		const selectAll = await trx.select('*').from('coworkers');
		expect(selectAll).toHaveLength(5);
		// await EntityFactory.deleteCoworkers(3, 3);
	});

	test('getAllUserWorkspaces', async () => {
		const coworkers = await coworkerRepository.getAllUserWorkspaces(1);
		expect(coworkers).toHaveLength(2);
	});
	test('getAllWorkspaceUsers', async () => {
		const coworkers = await coworkerRepository.getAllWorkspaceUsers(3);
		expect(coworkers).toHaveLength(1);
	});
	test('removeCoworker', async () => {
		trx = await db.transaction();
		await coworkerRepository.removeCoworker(trx, 1, 1);
		const coworkers = await trx('coworkers').where('userId', 1);
		expect(coworkers).toHaveLength(1);
	});

	afterAll(async () => {
		trx = await db.transaction();
		await Promise.all([
			EntityFactory.deleteCoworkers(1, 1),
			EntityFactory.deleteCoworkers(1, 2),
			EntityFactory.deleteCoworkers(2, 1),
			EntityFactory.deleteCoworkers(2, 3),
		]);

		await trx.schema.alterTable('coworkers', (table: any) => {
			table.foreign('userId').references('id').inTable('users');
			table.foreign('workspaceId').references('id').inTable('workspaces');
		});
	});
});
