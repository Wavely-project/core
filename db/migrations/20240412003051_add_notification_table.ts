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

//TODO: fix related repo and stuff, also add URL.
export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable('notifications', (table) => {
		table.increments('id').primary();
		table.integer('recipientId').unsigned();
		table.integer('messageId').unsigned().nullable();
		table.integer('channelId').unsigned().nullable();
		table.integer('workspaceId').unsigned().nullable();
		table.enum('type', ['mention', 'newMessage', 'invite']);
		table.boolean('isRead').defaultTo(false);
		table.datetime('createdAt').defaultTo(knex.fn.now());

		table.foreign('recipientId').references('users.id').onDelete('CASCADE');
		table
			.foreign('messageId')
			.references('messages.id')
			.onDelete('CASCADE');
		table
			.foreign('channelId')
			.references('channels.id')
			.onDelete('CASCADE');
		table
			.foreign('workspaceId')
			.references('workspaces.id')
			.onDelete('CASCADE');
	});
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTable('notifications');
}
