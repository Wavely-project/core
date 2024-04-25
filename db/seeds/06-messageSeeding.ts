import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import { env } from '../../src/common/utils/envConfig';
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
	type Message = {
		id: number;
		senderId: number;
		workspaceId: number;
		channelId: number;
		parentMessageId: number;
		content: string;
		createdAt: Date;
		updatedAt: Date;
	};
	let increment = generateId();
	const seeder: Message = {
		id: increment,
		senderId: faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS }),
		workspaceId: faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS }),
		channelId: faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS }),
		parentMessageId: 1,
		content: `message ${increment}`,
		createdAt: new Date(),
		updatedAt: new Date(),
	};
	const messages: Message[] = [{ ...seeder }];
	for (let i = 1; i < env.NUMBER_OF_SEEDS; i++) {
		increment = generateId();
		messages.push({
			id: increment,
			senderId: faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS }),
			workspaceId: faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS }),
			channelId: faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS }),
			parentMessageId: 1,
			content: `message ${increment}`,
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	}

	await Promise.all(messages.map((message) => knex('messages').insert(message)));
}
