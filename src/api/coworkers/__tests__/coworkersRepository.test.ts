import { mockedTxn } from '../../../common/__tests__/mocks';
import { coworkerRepository } from '../coworkersRepository';
describe('coworkerRepository', () => {
	const trx: any = mockedTxn;
	afterEach(() => {
		vi.clearAllMocks();
	});

	test('createCoworker', async () => {
		await coworkerRepository.createCoworker(trx, { userId: 1, workspaceId: 2 });
		expect(trx.insert).toBeCalledWith({ userId: 1, workspaceId: 2 });
		expect(trx.into).toBeCalledWith('coworkers');
	});

	test('getAllUserWorkspaces', async () => {
		await coworkerRepository.getAllUserWorkspaces(trx, 1);
		expect(trx.from).toBeCalledWith('coworkers');
		expect(trx.where).toBeCalledWith('userId', 1);
	});

	test('getAllWorkspaceUsers', async () => {
		await coworkerRepository.getAllWorkspaceUsers(trx, 3);
		expect(trx.from).toBeCalledWith('coworkers');
		expect(trx.where).toBeCalledWith('workspaceId', 3);
	});

	test('removeCoworker', async () => {
		await coworkerRepository.removeCoworker(trx, 1, 1);
		expect(trx.delete).toBeCalled();
		expect(trx.from).toBeCalledWith('coworkers');
	});
});
