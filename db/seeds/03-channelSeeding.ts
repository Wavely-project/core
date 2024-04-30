import { Knex } from 'knex';

import EntityFactory from '../../src/common/__tests__/entityFactory';

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('channels').del();

	// Inserts seed entries

	await Promise.all([
		EntityFactory.createChannel(1, 1, 1, 'channel 1', 'Descrcription', 'public'), // channel 1 in workspace 1 created by user 1
		EntityFactory.createChannel(2, 1, 1, 'channel 2', 'Descrcription', 'public'), // channel 2 in workspace 1 created by user 1
		EntityFactory.createChannel(3, 1, 2, 'channel 3', 'Descrcription', 'public'), // channel 3 in workspace 2 created by user 1
		EntityFactory.createChannel(4, 2, 3, 'channel 4', 'Descrcription', 'public'), // channel 4 in workspace 3 created by user 2
		EntityFactory.createChannel(5, 3, 4, 'channel 5', 'Descrcription', 'public'), // channel 5 in workspace 4 created by user 3
		EntityFactory.createChannel(6, 3, 4, 'channel 6', 'Descrcription', 'public'), // channel 6 in workspace 4 created by user 3
		EntityFactory.createChannel(7, 3, 5, 'channel 7', 'Descrcription', 'public'), // channel 7 in workspace 5 created by user 3
	]);
}
