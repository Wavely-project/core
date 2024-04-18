import db from '../../../../db/db';
import EntityFactory from '../../../common/__tests__/entityFactory';
import threadsRepository from '../threadsRepository';

describe('threadsRepository', () => {
	beforeAll(async () => {
		await db.schema.alterTable('threads', (table) => {
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

	test('createThread', async () => {
		await threadsRepository.createThread({ participantId: 3, parentMessageId: 3 });
		const threads = await db('threads').where('participantId', 3);
		expect(threads).toHaveLength(1);
	});

	test('getUserThreads', async () => {
		const threads = await threadsRepository.getUserThreads(2);
		expect(threads).toHaveLength(2);
	});

	test('deleteThread', async () => {
		await threadsRepository.deleteThread(1, 1);
		const threads = await db('threads').where('participantId', 1);
		expect(threads).toHaveLength(1);
	});

	afterAll(async () => {
		await Promise.all([
			EntityFactory.deleteThread(1, 1),
			EntityFactory.deleteThread(1, 2),
			EntityFactory.deleteThread(2, 1),
			EntityFactory.deleteThread(2, 3),
			EntityFactory.deleteThread(3, 3),
		]);

		await db.schema.alterTable('threads', (table) => {
			table.foreign('participantId').references('id').inTable('users');
			table.foreign('parentMessageId').references('id').inTable('messages');
		});
	});
});
