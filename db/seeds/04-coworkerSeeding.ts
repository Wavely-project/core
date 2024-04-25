import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import { env } from '../../src/common/utils/envConfig';

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
		userId: faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS }),
		workspaceId: faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS }),
		createdAt: new Date(),
	};
	const coworkers: { userId: number; workspaceId: number; createdAt: Date }[] = [{ ...seeder }];
	while (coworkers.length <= env.NUMBER_OF_SEEDS) {
		const userId = faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS });
		const workspaceId = faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS });
		if (!coworkers.some((b) => b.userId === userId && b.workspaceId === workspaceId)) {
			coworkers.push({
				userId,
				workspaceId,
				createdAt: new Date(),
			});
		}
	}
	await Promise.all(coworkers.map((coworker) => knex('coworkers').insert(coworker)));
}
