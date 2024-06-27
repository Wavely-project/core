import { Knex } from 'knex';

import {
	Channel,
	CreateChannelDto,
	updateChannelDto,
} from '@/api/channels/channelModel';

export const channelRepository = {
	create: async (
		channel: CreateChannelDto,
		trx: Knex.Transaction
	): Promise<Channel> => {
		const ids = await trx.insert(channel).into('channels');
		return trx.select('*').from('channels').where('id', ids[0]).first();
	},
	update: async (
		channelId: number,
		channel: updateChannelDto,
		trx: Knex.Transaction
	): Promise<Channel> => {
		await trx.update(channel).where('id', channelId).from('channels');
		return trx.select('*').from('channels').where('id', channelId).first();
	},
	getWorkspaceChannels: (
		workspaceId: number,
		cursor: number,
		limit: number,
		trx: Knex.Transaction
	): Promise<Channel[]> => {
		return trx
			.select('*')
			.from('channels')
			.where('workspaceId', workspaceId)
			.andWhere('id', '>', cursor)
			.limit(limit);
	},
	getById: (id: number, trx: Knex.Transaction): Promise<Channel | null> => {
		return trx.select('*').from('channels').where('id', id).first();
	},
	delete: (id: number, trx: Knex.Transaction) => {
		return trx.delete().from('channels').where('id', id);
	},
};
