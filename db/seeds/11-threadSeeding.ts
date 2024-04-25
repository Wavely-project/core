import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import { env } from '../../src/common/utils/envConfig';

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('threads').del();

	const seeder = {
		participantId: faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS }),
		parentMessageId: faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS }),
	};

	const threads: { participantId: number; parentMessageId: number }[] = [{ ...seeder }];
	while (threads.length <= env.NUMBER_OF_SEEDS) {
		const participantId = faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS });
		const parentMessageId = faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS });
		if (!threads.some((b) => b.participantId === participantId && b.parentMessageId === parentMessageId)) {
			threads.push({
				participantId,
				parentMessageId,
			});
		}
	}
	await Promise.all(threads.map((thread) => knex('threads').insert(thread)));
}
