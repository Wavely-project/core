import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import { IncrementalIdGenerator } from './01-userSeeding';
/*
channels {
  id uuid pk
  name string unique
  description string
  type enum public | private | direct
  creator_id uuid fk
  workspace_id uuid fk
  created_at date
  updated_at date
}

channels.creator_id > users.id
channels.workspace_id > workspaces.id
*/
const generateId = IncrementalIdGenerator(1);
export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('channels').del();

	let increment = generateId();
	const seeder = {
		id: increment,
		creatorId: faker.number.int({ min: 1, max: 10 }),
		workspaceId: faker.number.int({ min: 1, max: 10 }),
		name: `channel ${increment}`,
		description: `description ${increment}`,
		type: 'public',
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const channels: [object] = [{ ...seeder }];
	for (let i = 1; i < 10; i++) {
		increment = generateId();
		channels.push({
			id: increment,
			creatorId: faker.number.int({ min: 1, max: 10 }),
			workspaceId: faker.number.int({ min: 1, max: 10 }),
			name: `channel ${increment}`,
			description: `description ${increment}`,
			type: 'public',
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	}
	await Promise.all(channels.map((channel) => knex('channels').insert(channel)));
}
