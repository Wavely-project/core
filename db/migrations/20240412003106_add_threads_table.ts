import type { Knex } from 'knex';

/*
	threads {
	participant_id uuid pk
	parent_message_id uuid pk
	}

	threads.participant_id <> users.id
	threads.parent_message_id <> messages.id
*/

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('threads', (table) => {
		table.increments('id').primary();
		table.integer('participantId').unsigned();
		table.integer('parentMessageId').unsigned();
		table.primary(['participantId', 'parentMessageId']);

		table
			.foreign('participantId')
			.references('users.id')
			.onDelete('CASCADE');
		table
			.foreign('parentMessageId')
			.references('messages.id')
			.onDelete('CASCADE');
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('threads');
}
