import { Knex } from 'knex';

import EntityFactory from '../../src/common/__tests__/entityFactory';

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex('invites').del();

	// Inserts seed entries
	///************question: Can any user invite any other user to the workspace or only creator?***/
	await Promise.all([
		EntityFactory.createInvite(1, 1, 2, 1), // user 1 invites user 2 to workspace 1
		EntityFactory.createInvite(2, 1, 3, 1), // user 1 invites user 3 to workspace 1
		EntityFactory.createInvite(3, 1, 4, 1), // user 1 invites user 4 to workspace 1
		EntityFactory.createInvite(4, 2, 5, 3), // user 2 invites user 5 to workspace 3
		EntityFactory.createInvite(5, 2, 6, 3), // user 2 invites user 6 to workspace 3
		EntityFactory.createInvite(6, 3, 1, 4), // user 3 invites user 1 to workspace 4
		EntityFactory.createInvite(7, 3, 5, 5), // user 3 invites user 5 to workspace 5
	]);
}
