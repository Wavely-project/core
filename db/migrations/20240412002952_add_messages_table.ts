import type { Knex } from 'knex';

/*
messages {
  id uuid pk
  content string
  sender_id uuid fk 
  channel_id uuid fk
  parent_message_id uuid fk
  workspace_id uuid fk
  createdAt date
  updatedAt date
}

messages.sender_id > users.id
messages.workspace_id > workspaces.id
messages.channel_id > channels.id
messages.parent_message_id > messages.id
*/

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('messages', (table) => {
		table.increments('id').primary();
		table.string('content').notNullable();
		table.integer('senderId').unsigned();
		table.integer('channelId').unsigned();
		table.integer('parentMessageId').unsigned().nullable();
		table.integer('workspaceId').unsigned();

		table.foreign('senderId').references('id').inTable('users');
		table.foreign('workspaceId').references('id').inTable('workspaces');
		table.foreign('channelId').references('id').inTable('channels');
		table.foreign('parentMessageId').references('id').inTable('messages');

		table.timestamps(true, true, true);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('messages');
}
