import { mockedTxn } from '../../../common/__tests__/mocks';
import { channelRepository } from '../channelRepository';
describe('channelRepository', () => {
	// const trxProvide = db.transactionProvider();
	const trx: any = mockedTxn;
	afterEach(() => {
		vi.clearAllMocks();
	});
	test('createChannel', async () => {
		const channelData = {
			creatorId: 3,
			workspaceId: 3,
			name: 'channel5',
			description: 'description',
			type: 'public',
		};
		await channelRepository.createChannel(trx, channelData);
		expect(trx.insert).toBeCalledWith(channelData);
		expect(trx.into).toBeCalledWith('channels');
	});
	test('getAllWorkspaceChannels', async () => {
		await channelRepository.getWorkspaceChannels(trx, 3);
		expect(trx.from).toBeCalledWith('channels');
		expect(trx.where).toBeCalledWith('workspaceId', 3);
	});
	test('deleteChannel', async () => {
		await channelRepository.deleteChannel(trx, 4);
		expect(trx.where).toBeCalledWith('id', 4);
		expect(trx.delete).toBeCalled();
	});
});
