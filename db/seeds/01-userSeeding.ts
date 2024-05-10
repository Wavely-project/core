import { Knex } from 'knex';

import EntityFactory from '../../src/common/__tests__/entityFactory';

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('users').del();

	// Inserts seed entries
	await Promise.all([
		EntityFactory.createUser(1, 'user 1', 'email1@gmail.com', 'Test', 'User 1', 'password'),
		EntityFactory.createUser(2, 'user 2', 'email2@gmail.com', 'Test', 'User 2', 'password'),
		EntityFactory.createUser(3, 'user 3', 'email3@gmail.com', 'Test', 'User 3', 'password'),
		EntityFactory.createUser(4, 'user 4', 'email4@gmail.com', 'Test', 'User 4', 'password'),
		EntityFactory.createUser(5, 'user 5', 'email5@gmail.com', 'Test', 'User 5', 'password'),
		EntityFactory.createUser(6, 'user 6', 'email6@gmail.com', 'Test', 'User 6', 'password'),
	]);
}
