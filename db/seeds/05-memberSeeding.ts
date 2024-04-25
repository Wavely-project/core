import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import { env } from '../../src/common/utils/envConfig';

/*
members {
  userId
  channelId
  createdAt
}
*/
export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('members').del();

	const seeder = {
		userId: faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS }),
		channelId: faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS }),
		createdAt: new Date(),
	};

	const members: { userId: number; channelId: number; createdAt: Date }[] = [{ ...seeder }];
	while (members.length <= env.NUMBER_OF_SEEDS) {
		const userId = faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS });
		const channelId = faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS });
		if (!members.some((b) => b.userId === userId && b.channelId === channelId)) {
			members.push({
				userId,
				channelId,
				createdAt: new Date(),
			});
		}
	}
	await Promise.all(members.map((member) => knex('members').insert(member)));
}
