import { faker } from '@faker-js/faker';
import { Knex } from 'knex';
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
		userId: faker.number.int({ min: 1, max: 10 }),
		channelId: faker.number.int({ min: 1, max: 10 }),
		createdAt: new Date(),
	};

	const members: [object] = [{ ...seeder }];
	for (let i = 1; i < 10; i++) {
		members.push({
			userId: faker.number.int({ min: 1, max: 10 }),
			channelId: faker.number.int({ min: 1, max: 10 }),
			createdAt: new Date(),
		});
	}
	await Promise.all(members.map((member) => knex('members').insert(member)));
}
