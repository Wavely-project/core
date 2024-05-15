import { Knex } from 'knex';

import EntityFactory from '../../src/common/__tests__/entityFactory';

export async function seed(knex: Knex): Promise<void> {
	await knex('channels').del();

	/*
	 * workspace : channel[creator]
	 * 1        : 1[1], 2[1]
	 * 2        : 3[1]
	 * 3        : 4[2]
	 * 4        : 5[3], 6[3]
	 * 5        : 7[5]
	 *
	 * */

	await Promise.all([
		EntityFactory.createChannel(
			1,
			1,
			1,
			'channel 1',
			'Descrcription',
			'public'
		),
		EntityFactory.createChannel(
			2,
			1,
			1,
			'channel 2',
			'Descrcription',
			'public'
		),
		EntityFactory.createChannel(
			3,
			1,
			2,
			'channel 3',
			'Descrcription',
			'public'
		),
		EntityFactory.createChannel(
			4,
			2,
			3,
			'channel 4',
			'Descrcription',
			'public'
		),
		EntityFactory.createChannel(
			5,
			3,
			4,
			'channel 5',
			'Descrcription',
			'public'
		),
		EntityFactory.createChannel(
			6,
			3,
			4,
			'channel 6',
			'Descrcription',
			'public'
		),
		EntityFactory.createChannel(
			7,
			5,
			5,
			'channel 7',
			'Descrcription',
			'public'
		),
	]);
}
