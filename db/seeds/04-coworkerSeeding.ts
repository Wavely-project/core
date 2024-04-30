import { Knex } from 'knex';

import EntityFactory from '../../src/common/__tests__/entityFactory';

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('coworkers').del();

	// Inserts seed entries
	await Promise.all([
		EntityFactory.createCoworker(1, 1), // user 1 is coworker in workspace 1
		EntityFactory.createCoworker(2, 1), // user 2 is coworker in workspace 1
		EntityFactory.createCoworker(3, 1), // user 3 is coworker in workspace 1
		EntityFactory.createCoworker(4, 1), // user 4 is coworker in workspace 1
		EntityFactory.createCoworker(1, 2), // user 1 is coworker in workspace 2
		EntityFactory.createCoworker(5, 2), // user 5 is coworker in workspace 2
		EntityFactory.createCoworker(2, 3), // user 2 is coworker in workspace 3
		EntityFactory.createCoworker(6, 3), // user 6 is coworker in workspace 3
		EntityFactory.createCoworker(2, 4), // user 2 is coworker in workspace 4
		EntityFactory.createCoworker(3, 4), // user 3 is coworker in workspace 4
		EntityFactory.createCoworker(5, 5), // user 5 is coworker in workspace 5
	]);
}
