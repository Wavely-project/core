import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('workspaces', (table) => {
		table.increments('id').primary();
		table.string('name').notNullable();
		table.string('description');
		table.string('avatarUrl');
		table.integer('ownerId').unsigned();
		table.foreign('ownerId').references('id').inTable('users');

		table
			.dateTime('createdAt')
			.notNullable()
			.defaultTo(knex.raw('CURRENT_TIMESTAMP'));

		table
			.dateTime('updatedAt')
			.notNullable()
			.defaultTo(
				knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
			);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('workspaces');
}
