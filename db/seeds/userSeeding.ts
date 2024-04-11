import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

function createRandomUser() {
	return {
		id: faker.number.int({ min: 1, max: 100000 }),
		username: faker.internet.userName(),
		email: faker.internet.email(),
		name: faker.person.fullName(),
		password: faker.internet.password(),
		bio: faker.lorem.sentence(),
		avatarUrl: faker.image.avatar(),
		status: 'online',
		createdAt: new Date(),
		updatedAt: new Date(),
	};
}

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('users').del();

	const users = faker.helpers.multiple(createRandomUser, { count: 10 });
	await Promise.all(users.map((user) => knex('users').insert(user)));
}
