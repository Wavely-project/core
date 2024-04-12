import type { Knex } from 'knex';

/*
channels {
  id uuid pk
  name string unique
  description string
  type enum public | private | direct
  creator_id uuid fk
  workspace_id uuid fk
  created_at date
  updated_at date
}

channels.creator_id > users.id
channels.workspace_id > workspaces.id
*/

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('channels', (table) => {
		table.increments('id').primary();
		table.string('name').notNullable();
		table.string('description').notNullable();

		table.enum('type', ['public', 'private', 'direct']).notNullable();
		table.integer('creatorId').unsigned();
		table.integer('workspaceId').unsigned();

		//TODO: add this to another migrationFile
		table.foreign('creatorId').references('id').inTable('users');
		table.foreign('workspaceId').references('id').inTable('workspaces');
		table.timestamps(true, true, true);
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('channels');
}
