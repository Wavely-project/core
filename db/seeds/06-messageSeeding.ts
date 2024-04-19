import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import { IncrementalIdGenerator } from './01-userSeeding';
/*
messages {
  id uuid pk
  content string
  sender_id uuid fk 
  channel_id uuid fk
  parent_message_id uuid fk
  workspace_id uuid fk
  createdAt date
  updatedAt date
}

messages.sender_id > users.id
messages.workspace_id > workspaces.id
messages.channel_id > channels.id
messages.parent_message_id > messages.id
*/
const generateId = IncrementalIdGenerator(1);
export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('messages').del();
	let increment = generateId();

	const seeder: object = {
		id: increment,
		senderId: faker.number.int({ min: 1, max: 10 }),
		workspaceId: faker.number.int({ min: 1, max: 10 }),
		channelId: faker.number.int({ min: 1, max: 10 }),
		parentMessageId: 1,
		content: `message ${increment}`,
		createdAt: new Date(),
		updatedAt: new Date(),
	};
	const messages: object[] = [{ ...seeder }];
	for (let i = 1; i < 10; i++) {
		increment = generateId();
		messages.push({
			id: increment,
			senderId: faker.number.int({ min: 1, max: 10 }),
			workspaceId: faker.number.int({ min: 1, max: 10 }),
			channelId: faker.number.int({ min: 1, max: 10 }),
			parentMessageId: 1,
			content: `message ${increment}`,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	}

	await Promise.all(messages.map((message) => knex('messages').insert(message)));
}
