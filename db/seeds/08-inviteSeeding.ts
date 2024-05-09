import { Knex } from 'knex';

import EntityFactory from '../../src/common/__tests__/entityFactory';

export async function seed(knex: Knex): Promise<void> {
	await knex('invites').del();

	/*
	 * workspace: [sender -> receiver[status]]
	 *
	 * 1: [1 -> 2 [ac]]
	 * 1: [1 -> 3 [ac]]
	 * 1: [1 -> 4 [ac]]
	 * 2: [2 -> 5 [ca]]
	 * 3: [6 -> 1 [pe]]
	 * 3: [3 -> 1 [pe]]
	 * 5: [5 -> 1 [ca]]
	 *
	 * */

	await Promise.all([
		EntityFactory.createInvite(1, 1, 2, 1, 'accepted'),
		EntityFactory.createInvite(2, 1, 3, 1, 'accepted'),
		EntityFactory.createInvite(3, 1, 4, 1, 'accepted'),
		EntityFactory.createInvite(4, 2, 5, 3, 'cancelled'),
		EntityFactory.createInvite(5, 6, 1, 3, 'pending'),
		EntityFactory.createInvite(6, 3, 1, 4, 'pending'),
		EntityFactory.createInvite(7, 5, 1, 5, 'cancelled'),
	]);
}
