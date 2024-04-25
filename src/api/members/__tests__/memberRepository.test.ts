import { mockedTxn } from '../../../common/__tests__/mocks';
import { memberRepository } from '../memberRepository';

describe('memberRepository', () => {
	const trx: any = mockedTxn;
	afterEach(() => {
		vi.clearAllMocks();
	});

	test('createMember', async () => {
		await memberRepository.createMember(trx, { userId: 3, channelId: 3 });
		expect(trx.insert).toBeCalledWith({ userId: 3, channelId: 3 });
		expect(trx.into).toBeCalledWith('members');
	});

	test('getAllUserChannels', async () => {
		await memberRepository.getAllUserChannels(trx, 1);
		expect(trx.from).toBeCalledWith('members');
		expect(trx.where).toBeCalledWith('userId', 1);
	});

	test('getAllChannelUsers', async () => {
		await memberRepository.getAllChannelUsers(trx, 3);
		expect(trx.from).toBeCalledWith('members');
		expect(trx.where).toBeCalledWith('channelId', 3);
	});

	test('removeMember', async () => {
		await memberRepository.removeMember(trx, 1, 1);
		expect(trx.delete).toBeCalled();
		expect(trx.from).toBeCalledWith('members');
	});
});
