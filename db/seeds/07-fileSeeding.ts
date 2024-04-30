import { Knex } from 'knex';

import EntityFactory from '../../src/common/__tests__/entityFactory';

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('files').del();

	// Inserts seed entries
	// how does the sequence go, do we create messeges first or create message once file sent?
	await Promise.all([
		EntityFactory.createFile(1, 1, 1), // file 1  created by user 1 in message 1
		EntityFactory.createFile(2, 1, 5), // file 2  created by user 1 in message 5
		EntityFactory.createFile(3, 2, 12), // file 3  created by user 2 in message 6
		EntityFactory.createFile(4, 3, 6), // file 4  created by user 3 in message 6
		EntityFactory.createFile(5, 5, 11), // file 5  created by user 5 in message 11
	]);
}
