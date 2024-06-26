import type { Knex } from 'knex';

/*
files {
  id uuid pk
  file_name string
  file_size int 
  file_type string
  content blob
  message_id uuid fk
  uploaded_by uuid fk
  upload_at date
}

files.message_id - messages.id
files.uploaded_by > users.id
*/

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('files', (table) => {
		table.increments('id').primary();
		table.string('fileName').notNullable();
		table.integer('fileSize').notNullable();
		table.string('fileType').notNullable();
		table.binary('content').notNullable();
		table.dateTime('uploadAt').defaultTo(knex.fn.now());

		table.integer('messageId').unsigned();
		table.integer('uploadedBy').unsigned();

		table
			.foreign('messageId')
			.references('id')
			.inTable('messages')
			.onDelete('CASCADE');
		table
			.foreign('uploadedBy')
			.references('id')
			.inTable('users')
			.onDelete('CASCADE');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('files');
}
