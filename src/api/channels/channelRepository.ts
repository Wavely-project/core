import db from 'db/db';

import { Channel, CreateChannelDto } from '@/api/channels/channelModel';

export const channelRepository = {
	createChannel: async (channel: CreateChannelDto, trx?: any): Promise<Channel> => {
		trx = trx ? trx : db;

		const ids = await trx.insert(channel).into('channels');
		const newChannel = await trx.select('*').from('channels').where('id', ids[0]).first();
		return newChannel;
	},
	getWorkspaceChannels: async (id: number, cursor: any, limit: any, trx?: any): Promise<object> => {
		trx = trx ? trx : db;
		limit = parseInt(limit) || 10;
		cursor = parseInt(cursor) || 0;
		const channels = await trx
			.select(
				'channels.id',
				'channels.name',
				'channels.description',
				'channels.createdAt',
				'channels.updatedAt',
				'users.id as ownerId',
				'users.name as ownerName'
			)
			.from('channels')
			.leftJoin('users', 'channels.creatorId', 'users.id')
			.where('channels.workspaceId', id)
			.andWhere('channels.id', '>', cursor)
			.limit(limit + 1);
		let hasNextPage = false;
		if (channels.length > limit) {
			hasNextPage = true;
			channels.pop();
		}
		const data = channels.map((channel: any) => ({
			id: channel.id,
			name: channel.name,
			description: channel.description,
			owner: {
				id: channel.ownerId,
				name: channel.ownerName,
			},
			createdAt: channel.createdAt,
			updatedAt: channel.updatedAt,
			deletedAt: channel.deletedAt,
		}));
		const results = { data, hasNextPage };
		return results;
	},
	getById: async (id: number, trx?: any): Promise<Channel | null> => {
		trx = trx ? trx : db;

		return await trx.select('*').from('channels').where('id', id).first();
	},
	deleteChannel: async (id: number, trx?: any): Promise<void> => {
		trx = trx ? trx : db;

		return await trx.delete().from('channels').where('id', id);
	},
	updateChannel: async (id: number, channel: CreateChannelDto, trx?: any): Promise<Channel> => {
		trx = trx ? trx : db;

		await trx.update(channel).from('channels').where('id', id);
		const updatedChannel = await trx.select('*').from('channels').where('id', id).first();
		return updatedChannel;
	},
};
