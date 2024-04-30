import { Knex } from 'knex';

import EntityFactory from '../../src/common/__tests__/entityFactory';
export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('threads').del();

	// Inserts seed entries
	/************ we need to reimplement thread concept in DB */
	await Promise.all([
		EntityFactory.createThread(1, 2), // thread 1 in channel 1 after message 2
		EntityFactory.createThread(2, 5), // thread 2 in channel 1 after message 5
		EntityFactory.createThread(5, 9), // thread 3 in channel 2 after message 9
	]);
}
