import { Channel, CreateChannelDto } from '@/api/channels/channelModel';

export const channelRepository = {
	createChannel: async (
		trx: any,
		channel: CreateChannelDto
	): Promise<Channel> => {
		const ids = await trx.insert(channel).into('channels');
		const newChannel = await trx
			.select('*')
			.from('channels')
			.where('id', ids[0])
			.first();
		return newChannel;
	},
	getWorkspaceChannels: async (trx: any, id: number): Promise<Channel[]> => {
		return await trx.select('*').from('channels').where('workspaceId', id);
	},
	getById: async (trx: any, id: number): Promise<Channel | null> => {
		return await trx.select('*').from('channels').where('id', id).first();
	},
	deleteChannel: async (trx: any, id: number): Promise<void> => {
		return await trx.delete().from('channels').where('id', id);
	},
};
