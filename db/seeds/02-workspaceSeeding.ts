import { Knex } from 'knex';

import EntityFactory from '../../src/common/__tests__/entityFactory';

export async function seed(knex: Knex): Promise<void> {
	await knex('workspaces').del();

	/*
	 * user : workspaces
	 * 1    : 1, 2
	 * 6    : 3
	 * 2    : 4
	 * 5    : 5
	 *
	 * */

	await Promise.all([
		EntityFactory.createWorkspace(1, 1, 'workspace 1', 'Descrcription', 'url'),
		EntityFactory.createWorkspace(2, 1, 'workspace 2', 'Descrcription', 'url'),
		EntityFactory.createWorkspace(3, 6, 'workspace 3', 'Descrcription', 'url'),
		EntityFactory.createWorkspace(4, 2, 'workspace 4', 'Descrcription', 'url'),
		EntityFactory.createWorkspace(5, 5, 'workspace 5', 'Descrcription', 'url'),
	]);
}
