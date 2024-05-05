import { Knex } from 'knex';

import EntityFactory from '../../src/common/__tests__/entityFactory';

export async function seed(knex: Knex): Promise<void> {
	await knex('coworkers').del();

	/*
	 * workspace  : coworkers
	 * 1          : 1, 2, 3, 4
	 * 2          : 1, 5
	 * 3          : 2, 6
	 * 4          : 2, 3
	 * 5          : 5
	 *
	 * */

	await Promise.all([
		EntityFactory.createCoworker(1, 1),
		EntityFactory.createCoworker(2, 1),
		EntityFactory.createCoworker(3, 1),
		EntityFactory.createCoworker(4, 1),
		EntityFactory.createCoworker(1, 2),
		EntityFactory.createCoworker(5, 2),
		EntityFactory.createCoworker(2, 3),
		EntityFactory.createCoworker(6, 3),
		EntityFactory.createCoworker(2, 4),
		EntityFactory.createCoworker(3, 4),
		EntityFactory.createCoworker(5, 5),
	]);
}
