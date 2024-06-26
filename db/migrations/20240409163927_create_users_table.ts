import type { Knex } from 'knex';

/*
users {
  id uuid pk
  username string unique
  email string
  password string
  role_id uuid fk
  bio string
  avatar_url string
  status_message string
  online_status enum online | away | offline
  created_at date
  updated_at date
}
*/

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('users', (table) => {
		table.increments('id').primary();
		table.string('username').notNullable().unique();
		table.string('email').notNullable().unique();
		table.string('name').notNullable();
		table.string('password').notNullable();
		table.string('bio');
		table.string('avatarUrl');
		table
			.enum('status', ['online', 'offline', 'away'])
			.defaultTo('offline');
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
	return knex.schema.dropTable('users');
}
