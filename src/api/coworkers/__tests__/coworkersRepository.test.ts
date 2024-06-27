import { mockedTxn } from '../../../common/__tests__/mocks';
import { coworkerRepository } from '../coworkersRepository';
describe('coworkerRepository', () => {
	const trx: any = mockedTxn;
	afterEach(() => {
		vi.clearAllMocks();
	});

	test('createCoworker', async () => {
		await coworkerRepository.createCoworker(
			{
				userId: 1,
				workspaceId: 2,
			},
			trx
		);
		expect(trx.insert).toBeCalledWith({ userId: 1, workspaceId: 2 });
		expect(trx.into).toBeCalledWith('coworkers');
	});

	test('getAllUserWorkspaces', async () => {
		await coworkerRepository.getWorkspacesIds(1, trx);
		expect(trx.from).toBeCalledWith('coworkers');
		expect(trx.where).toBeCalledWith('userId', 1);
	});

	test('getAllWorkspaceUsers', async () => {
		await coworkerRepository.getUsersIds(3, 0, 10, trx);
		expect(trx.from).toBeCalledWith('coworkers');
		expect(trx.where).toBeCalledWith('workspaceId', 3);
	});

	test('removeCoworker', async () => {
		await coworkerRepository.removeCoworker(1, 1, trx);
		expect(trx.delete).toBeCalled();
		expect(trx.from).toBeCalledWith('coworkers');
	});
});
