import { StatusCodes } from 'http-status-codes';

import { Channel, CreateChannel } from '@/api/channels/channelModel';
import { channelRepository } from '@/api/channels/channelRepository';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';
// import { W } from 'vitest/dist/reporters-P7C2ytIv';

export const channelService = {
	createChannel: async (channel: CreateChannel): Promise<ServiceResponse<Channel | null>> => {
		try {
			const newChannel = await channelRepository.createChannel(channel);
			if (!newChannel) {
				return new ServiceResponse(
					ResponseStatus.Failed,
					'errorCreating Workspace',
					null,
					StatusCodes.INTERNAL_SERVER_ERROR
				);
			}
			return new ServiceResponse<Channel>(
				ResponseStatus.Success,
				'Channel created',
				newChannel,
				StatusCodes.CREATED
			);
		} catch (ex) {
			const errorMessage = `Error creating Channel: ${(ex as Error).message}`;
			logger.error(errorMessage);
			return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	},

	// // Retrieves all Channels from the database
	findAllChannels: async (): Promise<ServiceResponse<Channel[] | null>> => {
		try {
			const channels = await channelRepository.findAll();
			if (!channels) {
				return new ServiceResponse(ResponseStatus.Failed, 'No channels found', null, StatusCodes.NOT_FOUND);
			}
			return new ServiceResponse<Channel[]>(ResponseStatus.Success, 'channels found', channels, StatusCodes.OK);
		} catch (ex) {
			const errorMessage = `Error finding all channels: $${(ex as Error).message}`;
			logger.error(errorMessage);
			return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	},

	// Retrieves a single channel by their ID
	findChannelById: async (id: number): Promise<ServiceResponse<Channel | null>> => {
		try {
			const channel = await channelRepository.findById(id);
			if (!channel) {
				return new ServiceResponse(ResponseStatus.Failed, 'Channel not found', null, StatusCodes.NOT_FOUND);
			}
			return new ServiceResponse<Channel>(ResponseStatus.Success, 'User found', channel, StatusCodes.OK);
		} catch (ex) {
			const errorMessage = `Error finding channel with id ${id}:, ${(ex as Error).message}`;
			logger.error(errorMessage);
			return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	},
};
