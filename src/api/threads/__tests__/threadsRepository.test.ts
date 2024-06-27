import { mockedTxn } from '../../../common/__tests__/mocks';
import threadsRepository from '../threadsRepository';

describe('threadsRepository', () => {
	const trx: any = mockedTxn;
	test('createThread', async () => {
		await threadsRepository.createThread(
			{
				participantId: 3,
				parentMessageId: 3,
			},
			trx
		);
		expect(trx.insert).toBeCalledWith({
			participantId: 3,
			parentMessageId: 3,
		});
		expect(trx.into).toBeCalledWith('threads');
	});

	test('getUserThreads', async () => {
		await threadsRepository.getWorkspaceThreads(2, trx);
		expect(trx.select).toBeCalledWith('*');
		expect(trx.from).toBeCalledWith('threads');
		expect(trx.where).toBeCalledWith('participantId', 2);
	});

	test('deleteThread', async () => {
		await threadsRepository.deleteThread(1, 1, trx);
		expect(trx.delete).toBeCalled();
		expect(trx.from).toBeCalledWith('threads');
	});
});
