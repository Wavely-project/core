import { mockedTxn } from '../../../common/__tests__/mocks';
import threadsRepository from '../threadsRepository';

describe('threadsRepository', () => {
	const trx: any = mockedTxn;
	test('createThread', async () => {
		await threadsRepository.createThread(trx, {
			participantId: 3,
			parentMessageId: 3,
		});
		expect(trx.insert).toBeCalledWith({
			participantId: 3,
			parentMessageId: 3,
		});
		expect(trx.into).toBeCalledWith('threads');
	});

	test('getUserThreads', async () => {
		await threadsRepository.getUserThreads(trx, 2);
		expect(trx.select).toBeCalledWith('*');
		expect(trx.from).toBeCalledWith('threads');
		expect(trx.where).toBeCalledWith('participantId', 2);
	});

	test('deleteThread', async () => {
		await threadsRepository.deleteThread(trx, 1, 1);
		expect(trx.delete).toBeCalled();
		expect(trx.from).toBeCalledWith('threads');
	});
});
