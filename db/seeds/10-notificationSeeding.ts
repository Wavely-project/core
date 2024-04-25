import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import { env } from '../../src/common/utils/envConfig';
import { IncrementalIdGenerator } from './01-userSeeding';

/*
	notifications {
	id uuid pk
	recipient_id string fk
	message_id string fk
	type enum mention | new_message | invite
	id_read boolean
	created_at date
	}

	notifications.recipient_id > users.id
	notifications.message_id < messages.id
 */

const generateId = IncrementalIdGenerator(1);
export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('notifications').del();

	let increment = generateId();
	const seeder = {
		id: increment,
		recipientId: faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS }),
		messageId: faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS }),
		type: 'mention',
		isRead: false,
		createdAt: new Date(),
	};

	const notifications: object[] = [{ ...seeder }];
	for (let i = 1; i < env.NUMBER_OF_SEEDS; i++) {
		increment = generateId();
		notifications.push({
			id: increment,
			recipientId: faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS }),
			messageId: faker.number.int({ min: 1, max: env.NUMBER_OF_SEEDS }),
			type: 'mention',
			isRead: false,
			createdAt: new Date(),
		});
	}
	await Promise.all(notifications.map((notification) => knex('notifications').insert(notification)));
}
