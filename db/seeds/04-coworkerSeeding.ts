import { faker } from '@faker-js/faker';
import { Knex } from 'knex';
/*
coworker {
  userId
  workspaceId
  createdAt
}
*/
export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('coworkers').del();

	const seeder = {
		userId: faker.number.int({ min: 1, max: 10 }),
		workspaceId: faker.number.int({ min: 1, max: 10 }),
		createdAt: new Date(),
	};

	const coworkers: [object] = [{ ...seeder }];
	for (let i = 1; i < 10; i++) {
		coworkers.push({
			userId: faker.number.int({ min: 1, max: 10 }),
			workspaceId: faker.number.int({ min: 1, max: 10 }),
			createdAt: new Date(),
		});
	}
	await Promise.all(coworkers.map((coworker) => knex('coworkers').insert(coworker)));
}
