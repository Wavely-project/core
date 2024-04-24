import db from '../../../../db/db';
import EntityFactory from '../../../common/__tests__/entityFactory';
import filesRepository from '../filesRepository';

describe('filesRepository', () => {
	let trx: any;
	beforeAll(async () => {
		trx = await db.transaction();
		await trx.schema.alterTable('files', (table: any) => {
			table.dropForeign('messageId');
			table.dropForeign('uploadedBy');
		});
		await Promise.all([
			EntityFactory.createFile(trx, 1, 1, 1),
			EntityFactory.createFile(trx, 2, 1, 2),
			EntityFactory.createFile(trx, 3, 2, 3),
			EntityFactory.createFile(trx, 4, 2, 3),
		]);
	});

	test('createFile', async () => {
		const file = await filesRepository.createFile(trx, {
			fileName: 'file1',
			fileSize: 100,
			fileType: 'image/png',
			content: 'content',
			messageId: 1,
			uploadedBy: 1,
			uploadAt: new Date(),
		});
		const files = await trx('files');
		expect(files).toHaveLength(5);
		await EntityFactory.deleteFiles(trx, [file.id]);
	});

	test('findByMessageId', async () => {
		const files = await filesRepository.getFilesByMessageId(trx, 3);
		expect(files).toHaveLength(2);
	});

	test('getUserFiles', async () => {
		const files = await filesRepository.getUserFiles(trx, 1);
		expect(files).toHaveLength(2);
	});

	test('deleteFile', async () => {
		await filesRepository.deleteFile(trx, 1);
		const files = await trx('files').where('id', 1);
		expect(files).toHaveLength(0);
	});

	afterAll(async () => {
		trx = await db.transaction();
		await EntityFactory.deleteFiles(trx, [1, 2, 3, 4]);
		await trx.schema.alterTable('files', (table: any) => {
			table.foreign('messageId').references('id').inTable('messages');
			table.foreign('uploadedBy').references('id').inTable('users');
		});
		trx.commit();
	});
});
