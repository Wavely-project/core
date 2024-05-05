import { Request, Response } from 'express';

import { CreateChannel } from './channelModel';
import { channelRepository } from './channelRepository';

const ChannelController = {
	getChannelById: async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		res.json({ id });
	},
	createChannel: async (req: Request, res: Response) => {
		const { name, description, type, workspaceId } = req.body;

		const createChannelPayload: CreateChannel = {
			name,
			description,
			type,
			workspaceId,
			creatorId: res.locals.user.id,
		};
		res.json(createChannelPayload);
	},
	updateChannel: async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		const { name, description, type } = req.body;
		res.json({ id, name, description, type });
	},
	deleteChannel: async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		res.json({ id });
	},
	getWorkspaceChannels: async (req: Request, res: Response) => {
		const workspaceId = parseInt(req.params.id);
		const { cursor, limit } = req.query;
		const workspaceChannels = await channelRepository.getWorkspaceChannels(workspaceId, cursor, limit);
		res.json(workspaceChannels);
	},
};

export default ChannelController;
