import db from '../../../../db/db';
import EntityFactory from '../../../common/__tests__/entityFactory';
import { workspaceRepository } from '../workspaceRepository';
describe('workspaceRepository', () => {
	let trx: any;
	beforeAll(async () => {
		trx = await db.transaction();
		await trx.schema.alterTable('workspaces', (table: any) => {
			table.dropForeign('ownerId');
		});

		await Promise.all([
			EntityFactory.createWorkspace(1, 1, 'workspace1', 'description', 'url'),
			EntityFactory.createWorkspace(2, 1, 'workspace2', 'description', 'url'),
			EntityFactory.createWorkspace(3, 2, 'workspace3', 'description', 'url'),
			EntityFactory.createWorkspace(4, 3, 'workspace4', 'description', 'url'),
		]);
	});
	afterEach(async () => {
		await trx.rollback();
	});
	test('createWorkspace', async () => {
		trx = await db.transaction();
		const workspace = await workspaceRepository.createWorkspace(trx, {
			ownerId: 3,
			name: 'workspace5',
			description: 'description',
			avatarUrl: 'url',
		});
		expect(workspace.id).not.toBeNull();
		const workspaces = await trx.select('*').from('workspaces');
		expect(workspaces).toHaveLength(5);
		// await EntityFactory.deleteWorkspaces([workspace.id]);
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
		trx = await db.transaction();
		await workspaceRepository.deleteWorkspace(trx, 4);
		const workspaces = await trx.select('*').from('workspaces');
		expect(workspaces).toHaveLength(3);
	});

	afterAll(async () => {
		trx = await db.transaction();
		await Promise.all([EntityFactory.deleteWorkspaces([1, 2, 3, 4])]);
		await trx.schema.alterTable('workspaces', (table: any) => {
			table.foreign('ownerId').references('id').inTable('users');
		});
	});
}, 15000);
