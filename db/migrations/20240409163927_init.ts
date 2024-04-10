import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('users', (table) => {
		table.increments('id').primary();
		table.string('username').notNullable().unique();
		table.string('email').notNullable().unique();
		table.string('name').notNullable();
		table.string('password').notNullable();
		table.string('bio');
		table.string('avatarUrl');
		table.enum('status', ['online', 'offline', 'away']).defaultTo('offline');
		table.timestamps(true, true, true);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('users');
}
