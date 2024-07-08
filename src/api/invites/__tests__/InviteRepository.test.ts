import { mockedTxn } from '../../../common/__tests__/mocks';
import invitesRepository from '../invitesRepository';

describe('inviteRepository', () => {
	const trx: any = mockedTxn;

	afterEach(() => {
		vi.clearAllMocks();
	});
	let inviteData;
	test('createInvite', async () => {
		inviteData = {
			senderId: 1,
			inviteeId: 2,
			workspaceId: 4,
			status: 'pzending' as 'pending' | 'accepted' | 'cancelled',
			expiresAt: new Date(),
		};
		await invitesRepository.createInvite(trx, inviteData);
		expect(trx.insert).toBeCalledWith(inviteData);
		expect(trx.into).toBeCalledWith('invites');
	});

	test('getInviteById', async () => {
		await invitesRepository.getInviteById(trx, '1');
		expect(trx.from).toBeCalledWith('invites');
		expect(trx.where).toBeCalledWith('id', '1');
	});

	test('getInviteByWorkspaceId', async () => {
		await invitesRepository.getInviteByWorkspaceId(trx, '1');
		expect(trx.from).toBeCalledWith('invites');
		expect(trx.where).toBeCalledWith('workspaceId', '1');
	});

	test('acceptInvite', async () => {
		await invitesRepository.acceptInvite(trx, '1');
		expect(trx.update).toBeCalled();
		expect(trx.from).toBeCalledWith('invites');
	});

	test('cancelInvite', async () => {
		await invitesRepository.cancelInvite(trx, '1');
		expect(trx.update).toBeCalled();
		expect(trx.from).toBeCalledWith('invites');
	});
});
