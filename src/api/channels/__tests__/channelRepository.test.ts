import { mockedTxn } from '../../../common/__tests__/mocks';
import { CreateChannel } from '../channelModel';
import { channelRepository } from '../channelRepository';
describe('channelRepository', () => {
	// const trxProvide = db.transactionProvider();
	const trx: any = mockedTxn;
	afterEach(() => {
		vi.clearAllMocks();
	});
	test('createChannel', async () => {
		const channelData: CreateChannel = {
			creatorId: 3,
			workspaceId: 3,
			name: 'channel5',
			description: 'description',
			type: 'public',
		};
		await channelRepository.create(channelData, trx);
		expect(trx.insert).toBeCalledWith(channelData);
		expect(trx.into).toBeCalledWith('channels');
	});
	test('getAllWorkspaceChannels', async () => {
		await channelRepository.getWorkspaceChannels(3, 0, 10, trx);
		expect(trx.from).toBeCalledWith('channels');
		expect(trx.where).toBeCalledWith('workspaceId', 3);
	});
	test('deleteChannel', async () => {
		await channelRepository.delete(4, trx);
		expect(trx.where).toBeCalledWith('id', 4);
		expect(trx.delete).toBeCalled();
	});
});
