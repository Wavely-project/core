import { Knex } from 'knex';

import EntityFactory from '../../src/common/__tests__/entityFactory';

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('members').del();

	// Inserts seed entries
	await Promise.all([
		EntityFactory.createMember(1, 1), // user 1 is member in channel 1
		EntityFactory.createMember(2, 1), // user 2 is member in channel 1
		EntityFactory.createMember(3, 1), // user 3 is member in channel 1
		EntityFactory.createMember(4, 1), // user 4 is member in channel 1
		EntityFactory.createMember(1, 2), // user 1 is member in channel 2
		EntityFactory.createMember(4, 2), // user 4 is member in channel 2
		EntityFactory.createMember(1, 3), // user 1 is member in channel 3
		EntityFactory.createMember(5, 3), // user 5 is member in channel 3
		EntityFactory.createMember(2, 4), // user 2 is member in channel 4
		EntityFactory.createMember(6, 4), // user 6 is member in channel 4
		EntityFactory.createMember(2, 5), // user 2 is member in channel 5
		EntityFactory.createMember(3, 5), // user 3 is member in channel 5
		EntityFactory.createMember(3, 6), // user 3 is member in channel 6
		EntityFactory.createMember(5, 7), // user 5 is member in channel 7
	]);
}
