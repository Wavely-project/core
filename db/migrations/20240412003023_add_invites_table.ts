import type { Knex } from 'knex';
/*
invites {
  id uuid pk
  workspace_id uuid fk 
  invitee_id uuid fk 
  sender_id uuid fk 
  created_at date
  updated_at date
  expires_at date
  status enum pending | accepted | cancelled
}

invites.invitee_id <> users.id 
invites.sender_id <> users.id
invites.workspace_id <> workspaces.id
*/

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('invites', (table) => {
		table.increments('id').primary();
		table.integer('workspaceId').unsigned();
		table.integer('senderId').unsigned();
		table.integer('inviteeId').unsigned();

		table.timestamp('expiresAt').notNullable();
		table
			.enum('status', ['pending', 'accepted', 'cancelled'])
			.defaultTo('pending');

		// TODO: add this to another migrationFile
		table.foreign('workspaceId').references('id').inTable('workspaces');
		table.foreign('inviteeId').references('id').inTable('users');
		table.foreign('senderId').references('id').inTable('users');
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
	return knex.schema.dropTable('invites');
}
