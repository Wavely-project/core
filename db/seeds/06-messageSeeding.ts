import { Knex } from 'knex';

import EntityFactory from '../../src/common/__tests__/entityFactory';

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('messages').del();

	// Inserts seed entries
	await Promise.all([
		EntityFactory.createMessage(1, 1, 1, 1, 1, 'message 1'), // message 1 in channel 1 Sent by user 1
		EntityFactory.createMessage(2, 2, 1, 1, 1, 'message 2'), // message 2 in channel 1 Sent by user 2
		EntityFactory.createMessage(3, 3, 1, 1, 2, 'message 3'), // message 3 in channel 1 Sent by user 3
		EntityFactory.createMessage(4, 4, 1, 1, 3, 'message 4'), // message 4 in channel 1 Sent by user 4
		EntityFactory.createMessage(5, 1, 1, 1, 4, 'message 5'), // message 5 in channel 1 Sent by user 1
		EntityFactory.createMessage(6, 3, 1, 1, 5, 'message 6'), // message 6 in channel 1 Sent by user 3

		//******** Channel 2********/
		EntityFactory.createMessage(7, 1, 2, 1, 7, 'message 7'), // message 7 in channel 2 Sent by user 1
		EntityFactory.createMessage(8, 5, 2, 1, 7, 'message 8'), // message 8 in channel 2 Sent by user 5
		EntityFactory.createMessage(9, 1, 2, 1, 8, 'message 9'), // message 9 in channel 2 Sent by user 1
		EntityFactory.createMessage(10, 5, 2, 1, 9, 'message 10'), // message 10 in channel 2 Sent by user 5
		EntityFactory.createMessage(11, 5, 2, 1, 9, 'message 11'), // message 11 in channel 2 Sent by user 5

		//******** Channel 3********/
		EntityFactory.createMessage(12, 2, 3, 2, 12, 'message 12'), // message 12 in channel 3 Sent by user 2
		EntityFactory.createMessage(13, 6, 3, 2, 12, 'message 13'), // message 13 in channel 3 Sent by user 6
		EntityFactory.createMessage(14, 2, 3, 2, 12, 'message 14'), // message 14 in channel 3 Sent by user 2
	]);
	//******** Channel 1********/
}
