import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import { IncrementalIdGenerator } from './01-userSeeding';
const generateId = IncrementalIdGenerator(1);
export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('workspaces').del();

	let increment = generateId();
	const seeder = {
		id: increment,
		ownerId: faker.number.int({ min: 1, max: 10 }),
		name: `workspace ${increment}`,
		description: `description ${increment}`,
		avatarUrl: '',
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const workspaces: [object] = [{ ...seeder }];
	for (let i = 1; i < 10; i++) {
		increment = generateId();
		workspaces.push({
			id: increment,
			ownerId: faker.number.int({ min: 1, max: 10 }),
			name: `workspace ${increment}`,
			description: `description ${increment}`,
			avatarUrl: '',
			createdAt: new Date(),
			updatedAt: new Date(),
		});
	}
	await Promise.all(workspaces.map((workspace) => knex('workspaces').insert(workspace)));
}
