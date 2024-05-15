import { Knex } from 'knex';

import EntityFactory from '../../src/common/__tests__/entityFactory';

export async function seed(knex: Knex): Promise<void> {
	await knex('messages').del();

	// id[sender]: message
	// workspace x channel y(members)
	await Promise.all([
		/*
		 * 1[1]:
		 *   - 4[4]:
		 *   - 5[1]:
		 *   - 6[3]:
		 * 2[2]:
		 * 3[3]:
		 * */

		// workspace 1 channel 1(1,2,3,4)
		EntityFactory.createMessage(1, 1, 1, null, ''),
		EntityFactory.createMessage(2, 2, 1, null, ''),
		EntityFactory.createMessage(3, 3, 1, null, ''),
		EntityFactory.createMessage(4, 4, 1, 1, ''),
		EntityFactory.createMessage(5, 1, 1, 1, ''),
		EntityFactory.createMessage(6, 3, 1, 1, ''),

		/*
		 * 7[1]:
		 *   - 11[4]:
		 * 8[4]:
		 * 9[1]:
		 * 10[4]:
		 * */

		// workspace 1 channel 2(1,2)
		EntityFactory.createMessage(7, 1, 2, null, ''),
		EntityFactory.createMessage(8, 4, 2, null, ''),
		EntityFactory.createMessage(9, 1, 2, null, ''),
		EntityFactory.createMessage(10, 4, 2, null, ''),
		EntityFactory.createMessage(11, 4, 2, 7, ''),

		/*
		 * 12[1]:
		 *  - 13[5]:
		 *  - 14[1]:
		 * */

		// workspace 2 channel 3(1,5)
		EntityFactory.createMessage(12, 1, 3, null, ''),
		EntityFactory.createMessage(13, 5, 3, 12, ''),
		EntityFactory.createMessage(14, 1, 3, 12, ''),

		/*
		 * 15[2]:
		 * 16[6]:
		 * 17[2]:
		 * */

		// workspace 3 channel 4(2,6)
		EntityFactory.createMessage(15, 2, 4, null, ''),
		EntityFactory.createMessage(16, 6, 4, null, ''),
		EntityFactory.createMessage(17, 2, 4, null, ''),

		/*
		 * 18[2]:
		 * 19[3]:
		 * */

		// workspace 4 channel 5(2,3)
		EntityFactory.createMessage(18, 2, 5, null, ''),
		EntityFactory.createMessage(19, 3, 5, null, ''),

		/*
		 * 20[3]:
		 * */

		// workspace 4 channel 6(3)
		EntityFactory.createMessage(20, 3, 6, 19, '4'),
	]);
}
