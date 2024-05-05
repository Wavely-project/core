import { Request, Response } from 'express';

import { CreateMember } from './memberModel';

const MembersController = {
	getChannelUsers: async (req: Request, res: Response) => {
		const channelId = parseInt(req.params.id);
		res.json({ channelId });
	},
	getMemberById: async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		res.json({ id });
	},
	createMember: async (req: Request, res: Response) => {
		const userId = parseInt(req.params.userId);
		const channelId = parseInt(req.params.channelId);
		const createMemberPayload: CreateMember = {
			userId,
			channelId,
		};
		res.json(createMemberPayload);
	},
};

export default MembersController;
