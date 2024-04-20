import db from '../../../../db/db';
import EntityFactory from '../../../common/__tests__/entityFactory';
import { channelRepository } from '../channelRepository';
describe('channelRepository', () => {
	// const trxProvide = db.transactionProvider();
	let trx: any;
	beforeAll(async () => {
		trx = await db.transaction();
		await trx.schema.alterTable('channels', (table: any) => {
			table.dropForeign('workspaceId');
			table.dropForeign('creatorId');
		});
		await Promise.all([
			EntityFactory.createChannel(trx, 1, 1, 1, 'channel1', 'description', 'public'),
			EntityFactory.createChannel(trx, 2, 1, 1, 'channel2', 'description', 'public'),
			EntityFactory.createChannel(trx, 3, 2, 2, 'channel3', 'description', 'public'),
			EntityFactory.createChannel(trx, 4, 2, 3, 'channel4', 'description', 'public'),
		]);
	});
	// beforeEach(async () => {
	// 	trx = await db.transaction();
	// });
	afterEach(async () => {
		await trx.rollback();
	});

	test('createChannel', async () => {
		trx = await db.transaction();
		const channel = await channelRepository.createChannel(trx, {
			creatorId: 3,
			workspaceId: 3,
			name: 'channel5',
			description: 'description',
			type: 'public',
		});
		expect(channel.id).not.toBeNull();
		const selectAll = await trx.select('*').from('channels');
		expect(selectAll).toHaveLength(5);
		// await EntityFactory.deleteChannels([channel.id]);
	});

	test('getAllChannels', async () => {
		const channels = await channelRepository.findAll();
		expect(channels).toHaveLength(4);
	});
	test('getAllWorkspaceChannels', async () => {
		const channels = await channelRepository.findAllWorkspaceChannels(3);
		expect(channels).toHaveLength(1);
	});
	test('deleteChannel', async () => {
		await channelRepository.deleteChannel(4);
		const channels = await db('channels').where('workspaceId', 3);
		expect(channels).toHaveLength(0);
	});

	afterAll(async () => {
		trx = await db.transaction();
		await EntityFactory.deleteChannels([1, 2, 3, 4]);
		await trx.schema.alterTable('channels', (table: any) => {
			table.foreign('creatorId').references('id').inTable('users');
			table.foreign('workspaceId').references('id').inTable('workspaces');
		});
	});
}, 15000);
