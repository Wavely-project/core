import { Knex } from 'knex';

import EntityFactory from '../../src/common/__tests__/entityFactory';
export async function seed(knex: Knex): Promise<void> {
	await knex('threads').del();

	// from channel's seeds
	await Promise.all([
		// thread on message 1
		EntityFactory.createThread(4, 1),
		EntityFactory.createThread(1, 1),
		EntityFactory.createThread(3, 1),

		EntityFactory.createThread(4, 7),
		EntityFactory.createThread(1, 7),

		EntityFactory.createThread(5, 12),
		EntityFactory.createThread(1, 12),
	]);
}
