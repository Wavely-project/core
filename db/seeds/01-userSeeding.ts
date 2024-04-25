import { Knex } from 'knex';

import { env } from '../../src/common/utils/envConfig';

export function IncrementalIdGenerator(initialId: number = 0): () => number {
	let currentId = initialId;
	return () => {
		return currentId++;
	};
}

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('users').del();

	const generateId = IncrementalIdGenerator(1);
	let increment = generateId();
	const seeder = {
		id: increment,
		username: `user${increment}`,
		email: `email ${increment}@gmail.com`,
		name: `admin ${increment}`,
		password: `password ${increment}`,
		bio: '',
		avatarUrl: '',
		status: 'online',
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const users: [object] = [{ ...seeder }];
	for (let i = 1; i < env.NUMBER_OF_SEEDS; i++) {
		increment = generateId();
		users.push({
			id: increment,
			username: `user${increment}`,
			email: `email ${increment}@gmail.com`,
			name: `admin ${increment}`,
			password: `password ${increment}`,
			bio: '',
			avatarUrl: '',
			status: 'online',
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	}
	await Promise.all(users.map((user) => knex('users').insert(user)));
}
