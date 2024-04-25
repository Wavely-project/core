import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import { env } from '../../src/common/utils/envConfig';
import { IncrementalIdGenerator } from './01-userSeeding';

/*
invites {
  id uuid pk
  workspace_id uuid fk 
  invitee_id uuid fk 
  sender_id uuid fk 
  created_at date
  updated_at date
  expires_at date
  status enum pending | accepted | cancelled
}

invites.invitee_id <> users.id 
invites.sender_id <> users.id
invites.workspace_id <> workspaces.id
*/

const generateId = IncrementalIdGenerator(1);
export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('invites').del();

	let increment = generateId();
	const seeder = {
		id: increment,
		workspaceId: faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS }),
		inviteeId: faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS }),
		senderId: faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS }),
		createdAt: new Date(),
		updatedAt: new Date(),
		expiresAt: new Date('2024-12-12'),
	};

	const invites: object[] = [{ ...seeder }];
	for (let i = 1; i < env.NUMBER_OF_SEEDS; i++) {
		increment = generateId();
		invites.push({
			id: increment,
			workspaceId: faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS }),
			inviteeId: faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS }),
			senderId: faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS }),
			createdAt: new Date(),
			updatedAt: new Date(),
			expiresAt: new Date('2024-12-12'),
		});
	}
	await Promise.all(invites.map((invite) => knex('invites').insert(invite)));
}
