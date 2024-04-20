import db from '../../../../db/db';
import EntityFactory from '../../../common/__tests__/entityFactory';
import threadsRepository from '../threadsRepository';

describe('threadsRepository', () => {
	let trx: any;
	beforeAll(async () => {
		trx = await db.transaction();
		await trx.schema.alterTable('threads', (table: any) => {
			table.dropForeign('participantId');
			table.dropForeign('parentMessageId');
		});

		await Promise.all([
			EntityFactory.createThread(1, 1),
			EntityFactory.createThread(1, 2),
			EntityFactory.createThread(2, 1),
			EntityFactory.createThread(2, 3),
		]);
	});
	afterEach(async () => {
		await trx.rollback();
	});
	test('createThread', async () => {
		trx = await db.transaction();
		await threadsRepository.createThread(trx, { participantId: 3, parentMessageId: 3 });
		const threads = await trx('threads').where('participantId', 3);
		expect(threads).toHaveLength(1);
	});

	test('getUserThreads', async () => {
		const threads = await threadsRepository.getUserThreads(2);
		expect(threads).toHaveLength(2);
	});

	test('deleteThread', async () => {
		trx = await db.transaction();
		await threadsRepository.deleteThread(trx, 1, 1);
		const threads = await trx('threads').where('participantId', 1);
		expect(threads).toHaveLength(1);
	});

	afterAll(async () => {
		trx = await db.transaction();
		await Promise.all([
			EntityFactory.deleteThread(1, 1),
			EntityFactory.deleteThread(1, 2),
			EntityFactory.deleteThread(2, 1),
			EntityFactory.deleteThread(2, 3),
		]);

		await trx.schema.alterTable('threads', (table: any) => {
			table.foreign('participantId').references('id').inTable('users');
			table.foreign('parentMessageId').references('id').inTable('messages');
		});
	});
});
