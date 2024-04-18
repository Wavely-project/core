import db from '../../../../db/db';
import EntityFactory from '../../../common/__tests__/entityFactory';
import { channelRepository } from '../channelRepository';
describe('channelRepository', () => {
	beforeAll(async () => {
		await db.schema.alterTable('channels', (table) => {
			table.dropForeign('workspaceId');
			table.dropForeign('creatorId');
		});

		await Promise.all([
			EntityFactory.createChannel(1, 1, 1, 'channel1', 'description', 'public'),
			EntityFactory.createChannel(2, 1, 1, 'channel2', 'description', 'public'),
			EntityFactory.createChannel(3, 2, 2, 'channel3', 'description', 'public'),
			EntityFactory.createChannel(4, 2, 3, 'channel4', 'description', 'public'),
		]);
	});

	test('createChannel', async () => {
		const channel = await channelRepository.createChannel({
			creatorId: 3,
			workspaceId: 3,
			name: 'channel5',
			description: 'description',
			type: 'public',
		});
		expect(channel.id).not.toBeNull();
		const selectAll = await db.select('*').from('channels');
		expect(selectAll).toHaveLength(5);
		await EntityFactory.deleteChannels([channel.id]);
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
		await Promise.all([EntityFactory.deleteChannels([1, 2, 3, 4])]);

		await db.schema.alterTable('channels', (table) => {
			table.foreign('creatorId').references('id').inTable('users');
			table.foreign('workspaceId').references('id').inTable('workspaces');
		});
	});
});
