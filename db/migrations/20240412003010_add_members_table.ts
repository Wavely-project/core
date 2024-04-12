import type { Knex } from 'knex';

/*
members {
  user_id uuid pk
  channel_id uuid pk
  created_at string
}

members.user_id < users.id
members.channel_id < channels.id

*/

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('members', (table) => {
		table.integer('userId').unsigned();
		table.integer('channelId').unsigned();
		table.timestamp('createdAt').defaultTo(knex.fn.now());

		table.primary(['userId', 'channelId']);

		table.foreign('userId').references('id').inTable('users');
		table.foreign('channelId').references('id').inTable('channels');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('members');
}
