import db from '../../../../db/db';
import EntityFactory from '../../../common/__tests__/entityFactory';
import { workspaceRepository } from '../workspaceRepository';
describe('workspaceRepository', () => {
	beforeAll(async () => {
		await db.schema.alterTable('workspaces', (table) => {
			table.dropForeign('ownerId');
		});

		await Promise.all([
			EntityFactory.createWorkspace(1, 1, 'workspace1', 'description', 'url'),
			EntityFactory.createWorkspace(2, 1, 'workspace2', 'description', 'url'),
			EntityFactory.createWorkspace(3, 2, 'workspace3', 'description', 'url'),
			EntityFactory.createWorkspace(4, 3, 'workspace4', 'description', 'url'),
		]);
	});

	test('createWorkspace', async () => {
		const workspace = await workspaceRepository.createWorkspace({
			ownerId: 3,
			name: 'workspace5',
			description: 'description',
			avatarUrl: 'url',
		});
		expect(workspace.id).not.toBeNull();
		const workspaces = await db.select('*').from('workspaces');
		expect(workspaces).toHaveLength(5);
		await EntityFactory.deleteWorkspaces([workspace.id]);
	});

	test('getAllWorkspaces', async () => {
		const workspaces = await workspaceRepository.findAll();
		expect(workspaces).toHaveLength(4);
	});
	test('getAllWorkspaceChannels', async () => {
		const workspaces = await workspaceRepository.findAllUserWorkspaces(1);
		expect(workspaces).toHaveLength(2);
	});
	test('deleteWorkspace', async () => {
		await workspaceRepository.deleteWorkspace(2);
		const workspaces = await db('workspaces').where('ownerId', 1);
		expect(workspaces).toHaveLength(1);
	});

	afterAll(async () => {
		await Promise.all([EntityFactory.deleteWorkspaces([1, 3, 4])]);

		await db.schema.alterTable('workspaces', (table) => {
			table.foreign('ownerId').references('id').inTable('users');
		});
	});
});
