import { Knex } from 'knex';

import EntityFactory from '../../src/common/__tests__/entityFactory';

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('workspaces').del();

	// Inserts seed entries
	await Promise.all([
		EntityFactory.createWorkspace(1, 1, 'workspace 1', 'Descrcription', 'url'),
		EntityFactory.createWorkspace(2, 1, 'workspace 2', 'Descrcription', 'url'),
		EntityFactory.createWorkspace(3, 2, 'workspace 3', 'Descrcription', 'url'),
		EntityFactory.createWorkspace(4, 3, 'workspace 4', 'Descrcription', 'url'),
		EntityFactory.createWorkspace(5, 3, 'workspace 5', 'Descrcription', 'url'),
	]);
}
