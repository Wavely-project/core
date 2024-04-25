import type { Knex } from 'knex';

/*
coworkers {
  user_id uuid pk
  workspace_id uuid pk
  created_at string
}

coworkers.user_id < users.id
coworkers.workspace_id < workspace.id

*/

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('coworkers', (table) => {
		table.integer('userId').unsigned();
		table.integer('workspaceId').unsigned();
		table.timestamp('createdAt').defaultTo(knex.fn.now());

		table.primary(['userId', 'workspaceId']);

		table.foreign('userId').references('id').inTable('users');
		table.foreign('workspaceId').references('id').inTable('workspaces');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('coworkers');
}
