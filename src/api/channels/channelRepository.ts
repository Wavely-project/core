import { Channel, CreateChannelDto } from '@/api/channels/channelModel';

export const channelRepository = {
	createChannel: async (trx: any, channel: CreateChannelDto): Promise<Channel> => {
		const ids = await trx('channels').insert(channel);
		const newChannel = await trx('channels').where('id', ids[0]).first();
		return newChannel;
	},
	findAll: async (trx: any): Promise<Channel[]> => {
		return await trx.select('*').from('channels');
	},
	findAllWorkspaceChannels: async (trx: any, id: number): Promise<Channel[]> => {
		return await trx.select('*').from('channels').where('workspaceId', id);
	},

	findById: async (trx: any, id: number): Promise<Channel | null> => {
		return await trx.select('*').from('channels').where('id', id).first();
	},
	deleteChannel: async (trx: any, id: number): Promise<void> => {
		await trx('channels').where('id', id).delete();
	},
};
