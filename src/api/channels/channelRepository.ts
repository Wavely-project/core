import { Channel, CreateChannelDto } from '@/api/channels/channelModel';

import db from '../../../db/db';

export const channelRepository = {
	createChannel: async (channel: CreateChannelDto): Promise<Channel> => {
		const ids = await db('channels').insert(channel);
		const newChannel = await db('channels').where('id', ids[0]).first();
		return newChannel;
	},
	findAll: async (): Promise<Channel[]> => {
		return await db.select('*').from('channels');
	},
	findAllWorkspaceChannels: async (id: number): Promise<Channel[]> => {
		return await db.select('*').from('channels').where('workspaceId', id);
	},

	findById: async (id: number): Promise<Channel | null> => {
		return await db.select('*').from('channels').where('id', id).first();
	},
};
