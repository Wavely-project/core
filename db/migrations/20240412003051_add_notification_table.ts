import type { Knex } from 'knex';

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

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('notifications', (table) => {
		table.increments('id').primary();
		table.integer('recipientId').unsigned();
		table.integer('messageId').unsigned();
		table.enum('type', ['mention', 'newMessage', 'invite']);
		table.boolean('isRead').defaultTo(false);
		table.datetime('createdAt').defaultTo(knex.fn.now());

		table.foreign('recipientId').references('users.id');
		table.foreign('messageId').references('messages.id');
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('notifications');
}
