import { Knex } from 'knex';

import EntityFactory from '../../src/common/__tests__/entityFactory';

export async function seed(knex: Knex): Promise<void> {
	await knex('files').del();

	/*
	 * message[sender]: files
	 * 1[1]        : 1,
	 * 5[1]        : 2,
	 * 13[5]       : 3,
	 * 15[2]       : 4,
	 * 19[3]       : 5,
	 *
	 * */

	await Promise.all([
		EntityFactory.createFile(1, 1, 1),
		EntityFactory.createFile(2, 1, 5),
		EntityFactory.createFile(3, 5, 13),
		EntityFactory.createFile(4, 2, 15),
		EntityFactory.createFile(5, 3, 19),
	]);
}
