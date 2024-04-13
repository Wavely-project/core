import db from '../../../../db/db';
import EntityFactory from '../../../common/__tests__/entityFactory';
import filesRepository from '../filesRepository';

describe('filesRepository', () => {
	beforeAll(async () => {
		await db.schema.alterTable('files', (table) => {
			table.dropForeign('messageId');
			table.dropForeign('uploadedBy');
		});
		await Promise.all([
			EntityFactory.createFile(1, 1, 1),
			EntityFactory.createFile(2, 1, 2),
			EntityFactory.createFile(3, 2, 3),
			EntityFactory.createFile(4, 2, 3),
		]);
	});

	test('createFile', async () => {
		const file = await filesRepository.createFile({
			fileName: 'file1',
			fileSize: 100,
			fileType: 'image/png',
			content: 'content',
			messageId: 1,
			uploadedBy: 1,
			uploadAt: new Date(),
		});
		expect(file.id).toBe(5);
	});

	test('findByMessageId', async () => {
		const files = await filesRepository.getFilesByMessageId(3);
		expect(files).toHaveLength(2);
	});

	test('find Files uploaded by a user', async () => {
		const files = await filesRepository.getUserFiles(1);
		expect(files).toHaveLength(2);
	});

	test('delete a file', async () => {
		await filesRepository.deleteFile(1);
		const files = await db('files').where('id', 1);
		expect(files).toHaveLength(0);
	});

	afterAll(async () => {
		await EntityFactory.deleteFiles([1, 2, 3, 4]);
		await db.schema.alterTable('files', (table) => {
			table.foreign('messageId').references('id').inTable('messages');
			table.foreign('uploadedBy').references('id').inTable('users');
		});
	});
});
