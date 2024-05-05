import { Knex } from 'knex';

import EntityFactory from '../../src/common/__tests__/entityFactory';

export async function seed(knex: Knex): Promise<void> {
	await knex('reactions').del();

	/*
	 * message: user[reaction]
	 * 1: 1[like], 2[dislike]
	 * 2: 3[like], 1[love]
	 * 3: 2[like], 3[angry]
	 * 4: 4[like]
	 * 10: 1[love]
	 *
	 * */

	await Promise.all([
		EntityFactory.createReaction(1, 1, 1, 'like'),
		EntityFactory.createReaction(2, 2, 1, 'dislike'),
		EntityFactory.createReaction(3, 3, 2, 'like'),
		EntityFactory.createReaction(4, 1, 2, 'love'),
		EntityFactory.createReaction(5, 2, 3, 'like'),
		EntityFactory.createReaction(6, 3, 3, 'angry'),
		EntityFactory.createReaction(7, 4, 4, 'like'),
		EntityFactory.createReaction(8, 1, 10, 'love'),
	]);
}
