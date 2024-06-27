import { mockedTxn } from '../../../common/__tests__/mocks';
import { CreateFileDto } from '../filesModel';
import filesRepository from '../filesRepository';

describe('filesRepository', () => {
	const trx: any = mockedTxn;
	test('createFile', async () => {
		const fileData: CreateFileDto = {
			fileName: 'file1',
			fileSize: 100,
			fileType: 'image/png',
			content: 'content',
			messageId: 1,
			uploadedBy: 1,
			uploadAt: new Date(),
		};
		await filesRepository.createFile(trx, fileData);
		expect(trx.insert).toBeCalledWith(fileData);
		expect(trx.into).toBeCalledWith('files');
	});

	test('findByMessageId', async () => {
		await filesRepository.getFilesByMessageId(trx, 3);
		expect(trx.select).toBeCalledWith('*');
		expect(trx.from).toBeCalledWith('files');
		expect(trx.where).toBeCalledWith('messageId', 3);
	});

	test('getUserFiles', async () => {
		await filesRepository.getUserFiles(trx, 1);
		expect(trx.select).toBeCalledWith('*');
		expect(trx.from).toBeCalledWith('files');
		expect(trx.where).toBeCalledWith('uploadedBy', 1);
	});

	test('deleteFile', async () => {
		await filesRepository.deleteFile(trx, 1);
		expect(trx.delete).toBeCalled();
		expect(trx.from).toBeCalledWith('files');
	});
});
