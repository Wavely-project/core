import { Knex } from 'knex';

// import EntityFactory from '../../src/common/__tests__/entityFactory';

export async function seed(knex: Knex): Promise<void> {
	await knex('notifications').del();

	await Promise.all([
		// // user one notifications
		// EntityFactory.createNotification(1, 1, 4, 'newMessage'),
		// EntityFactory.createNotification(2, 1, 2, 'mention'),
		// EntityFactory.createNotification(3, 1, 3, 'invite', true),
		//
		// // user two notifications
		// EntityFactory.createNotification(4, 5, 8, 'mention'),
		// EntityFactory.createNotification(5, 1, 9, 'newMessage'),
		//
		// EntityFactory.createNotification(6, 1, 1, 'invite'),
		// EntityFactory.createNotification(7, 2, 1, 'invite'),
		// EntityFactory.createNotification(8, 3, 1, 'invite'),
		// EntityFactory.createNotification(9, 4, 1, 'invite'),
		// EntityFactory.createNotification(10, 5, 1, 'invite'),
		// EntityFactory.createNotification(11, 5, 1, 'invite'),
		// EntityFactory.createNotification(12, 6, 1, 'invite'),
	]);
}
