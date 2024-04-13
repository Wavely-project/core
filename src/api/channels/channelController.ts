import { Request, Response } from 'express';

import { handleServiceResponse } from '../../common/utils/httpHandlers';
import { CreateChannel } from './channelModel';
import { channelService } from './channelService';

const ChannelController = {
	getChannels: async (req: Request, res: Response) => {
		// const id = parseInt(req.params.id);
		const serviceResponse = await channelService.findAllChannels();
		handleServiceResponse(serviceResponse, res);
	},
	getChannelById: async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		const serviceResponse = await channelService.findChannelById(id);
		handleServiceResponse(serviceResponse, res);
	},
	createChannel: async (req: Request, res: Response) => {
		const { name, description, creatorId, type, workspaceId } = req.body;

		const createChannelPayload: CreateChannel = {
			name,
			description,
			creatorId,
			type,
			workspaceId,
		};

		const serviceResponse = await channelService.createChannel(createChannelPayload);
		handleServiceResponse(serviceResponse, res);
	},
};

export default ChannelController;
