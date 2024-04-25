import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import { env } from '../../src/common/utils/envConfig';
import { IncrementalIdGenerator } from './01-userSeeding';

/*
reactions {
  id uuid pk
  user_id uuid fk
  message_id uuid fk
  reaction string 
}
reactions.user_id <> users.email
reactions.message_id <> messages.id
 */

const generateId = IncrementalIdGenerator(1);
export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('reactions').del();

	let increment = generateId();
	const seeder = {
		id: increment,
		userId: faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS }),
		messageId: faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS }),
		reaction: 'love',
	};

	const reactions: object[] = [{ ...seeder }];
	for (let i = 1; i < env.NUMBER_OF_SEEDS; i++) {
		increment = generateId();
		reactions.push({
			id: increment,
			userId: faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS }),
			messageId: faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS }),
			reaction: 'love',
		});
	}
	await Promise.all(reactions.map((reaction) => knex('reactions').insert(reaction)));
}
