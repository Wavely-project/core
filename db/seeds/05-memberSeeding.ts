import { Knex } from 'knex';

import EntityFactory from '../../src/common/__tests__/entityFactory';

export async function seed(knex: Knex): Promise<void> {
	await knex('members').del();

	/*
	 * channel : members
	 * 1       : 1, 2, 3, 4
	 * 2       : 1, 4
	 * 3       : 1, 5
	 * 4       : 2, 6
	 * 5       : 2, 3
	 * 6       : 3
	 * 7       : 5
	 *
	 * */

	await Promise.all([
		EntityFactory.createMember(1, 1),
		EntityFactory.createMember(2, 1),
		EntityFactory.createMember(3, 1),
		EntityFactory.createMember(4, 1),
		EntityFactory.createMember(1, 2),
		EntityFactory.createMember(4, 2),
		EntityFactory.createMember(1, 3),
		EntityFactory.createMember(5, 3),
		EntityFactory.createMember(2, 4),
		EntityFactory.createMember(6, 4),
		EntityFactory.createMember(2, 5),
		EntityFactory.createMember(3, 5),
		EntityFactory.createMember(3, 6),
		EntityFactory.createMember(5, 7),
	]);
}
