import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('workspaces', (table) => {
		table.increments('id').primary();
		table.string('name').notNullable();
		table.string('description');
		table.string('avatarUrl');
		table.integer('ownerId').unsigned();
		table.foreign('ownerId').references('id').inTable('users');
		table.timestamps(true, true, true);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('workspaces');
}
