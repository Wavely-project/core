import { Knex } from 'knex';

import EntityFactory from '../../src/common/__tests__/entityFactory';

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('reactions').del();

	// Inserts seed entries
	await Promise.all([
		EntityFactory.createReaction(1, 1, 1, 'like'), // user 1 reacted like in message 1
		EntityFactory.createReaction(2, 2, 1, 'dislike'), // user 2 reacted dislike in message 1
		EntityFactory.createReaction(3, 3, 2, 'like'), // user 3 reacted like in message 2
		EntityFactory.createReaction(4, 1, 2, 'love'), // user 1 reacted dislike in message 2
		EntityFactory.createReaction(5, 2, 3, 'like'), // user 2 reacted like in message 3
		EntityFactory.createReaction(6, 3, 3, 'angry'), // user 3 reacted dislike in message 3
		EntityFactory.createReaction(7, 4, 4, 'like'), // user 4 reacted like in message 4
		EntityFactory.createReaction(8, 1, 10, 'love'), // user 12 reacted dislike in message 10
	]);
}
