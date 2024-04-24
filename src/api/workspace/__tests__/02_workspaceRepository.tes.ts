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
			EntityFactory.createWorkspace(trx, 1, 1, 'workspace1', 'description', 'url'),
			EntityFactory.createWorkspace(trx, 2, 1, 'workspace2', 'description', 'url'),
			EntityFactory.createWorkspace(trx, 3, 2, 'workspace3', 'description', 'url'),
			EntityFactory.createWorkspace(trx, 4, 3, 'workspace4', 'description', 'url'),
		]);
	});

	test('createWorkspace', async () => {
		const workspace = await workspaceRepository.createWorkspace(trx, {
			ownerId: 3,
			name: 'workspace5',
			description: 'description',
			avatarUrl: 'url',
		});
		expect(workspace.id).not.toBeNull();
		const workspaces = await trx.select('*').from('workspaces');
		expect(workspaces).toHaveLength(5);
		await EntityFactory.deleteWorkspaces(trx, [workspace.id]);
	});

	test('getAllUserWorkspaces', async () => {
		const workspaces = await workspaceRepository.findAllUserWorkspaces(trx, 1);
		expect(workspaces).toHaveLength(2);
	});
	test('deleteWorkspace', async () => {
		await workspaceRepository.deleteWorkspace(trx, 4);
		const workspaces = await trx.select('*').from('workspaces');
		expect(workspaces).toHaveLength(3);
	});

	afterAll(async () => {
		await Promise.all([EntityFactory.deleteWorkspaces(trx, [1, 2, 3])]);
		await trx.schema.alterTable('workspaces', (table: any) => {
			table.foreign('ownerId').references('id').inTable('users');
		});
		trx.commit();
	});
}, 15000);
