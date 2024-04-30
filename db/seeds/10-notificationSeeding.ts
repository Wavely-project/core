import { Knex } from 'knex';

import EntityFactory from '../../src/common/__tests__/entityFactory';

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('notifications').del();

	// Inserts seed entries
	await Promise.all([
		EntityFactory.createNotification(1, 1, 3, 'newMessage'), // user 1 has new message
		EntityFactory.createNotification(2, 2, 2, 'mention'), // user 2 has mention
		EntityFactory.createNotification(3, 3, 5, 'newMessage'), // user 3 has new message
		/******/
		EntityFactory.createNotification(4, 5, 8, 'mention'), // user 5 has mention
		EntityFactory.createNotification(5, 1, 9, 'newMessage'), // user 1 has new message
		/***********/
		//message 1 is the base message for all invites
		EntityFactory.createNotification(6, 1, 1, 'invite'), // user 1 has invite
		EntityFactory.createNotification(7, 2, 1, 'invite'), // user 2 has invite
		EntityFactory.createNotification(8, 3, 1, 'invite'), // user 3 has invite
		EntityFactory.createNotification(9, 4, 1, 'invite'), // user 4 has invite
		EntityFactory.createNotification(10, 5, 1, 'invite'), // user 5 has invite
		EntityFactory.createNotification(11, 5, 1, 'invite'), // user 5 has invite
		EntityFactory.createNotification(12, 6, 1, 'invite'), // user 6 has invite
	]);
}
