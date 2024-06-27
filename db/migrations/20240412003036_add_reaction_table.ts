import type { Knex } from 'knex';

/*
reactions {
  id uuid pk
  user_id uuid fk
  message_id uuid fk
  reaction string 
}
reactions.user_id <> users.email
reactions.message_id <> messages.id
 */

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('reactions', (table) => {
		table.increments('id').primary();
		table.integer('userId').unsigned();
		table.integer('messageId').unsigned();
		table.string('reaction').notNullable();

		table
			.foreign('userId')
			.references('id')
			.inTable('users')
			.onDelete('CASCADE');
		table
			.foreign('messageId')
			.references('id')
			.inTable('messages')
			.onDelete('CASCADE');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('reactions');
}
