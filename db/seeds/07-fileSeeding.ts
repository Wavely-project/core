import { faker } from '@faker-js/faker';
import { Knex } from 'knex';

import { IncrementalIdGenerator } from './01-userSeeding';
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
const generateId = IncrementalIdGenerator(1);
export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('files').del();

	let increment = generateId();
	const seeder = {
		id: increment,
		messageId: faker.number.int({ min: 1, max: 10 }),
		uploadedBy: faker.number.int({ min: 1, max: 10 }),
		fileName: `file ${increment}`,
		fileSize: 20,
		fileType: 'photos',
		// content: 1,
		uploadedAt: new Date(),
	};

	const files: [object] = [{ ...seeder }];
	for (let i = 1; i < 10; i++) {
		increment = generateId();
		files.push({
			id: increment,
			messageId: faker.number.int({ min: 1, max: 10 }),
			uploadedBy: faker.number.int({ min: 1, max: 10 }),
			fileName: `file ${increment}`,
			fileSize: 20,
			fileType: 'photos',
			// content: 1,
			uploadedAt: new Date(),
		});
	}
	await Promise.all(files.map((file) => knex('files').insert(file)));
}
