import { vi } from 'vitest';

import { mockedTxn } from '../../../common/__tests__/mocks';
import { workspaceRepository } from '../workspaceRepository';

describe('workspaceRepository', () => {
	const trx: any = mockedTxn;
	afterAll(async () => {
		vi.clearAllMocks();
	});
	test('createWorkspace', async () => {
		const workspaceData = {
			ownerId: 3,
			name: 'workspace5',
			description: 'description',
			avatarUrl: 'url',
		};
		await workspaceRepository.create(workspaceData, trx);
		expect(trx.insert).toBeCalledWith(workspaceData);
		expect(trx.into).toBeCalledWith('workspaces');
	});

	test('getAllUserWorkspaces', async () => {
		await workspaceRepository.getByIds([1], trx);
		expect(trx.from).toBeCalledWith('workspaces');
		expect(trx.whereIn).toBeCalledWith('id', [1]);
	});
	test('deleteWorkspace', async () => {
		await workspaceRepository.delete(4, trx);
		expect(trx.where).toBeCalledWith('id', 4);
	});
});
