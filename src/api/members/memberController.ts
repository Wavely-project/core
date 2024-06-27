import { Request, Response } from 'express';

import { handleServiceResponse } from '@/common/utils/httpHandlers';

import { CreateMember } from './memberModel';
import { getChannelUsers } from './memberService';

const MembersController = {
	getChannelUsers: async (req: Request, res: Response) => {
		const channelId = parseInt(req.params.id);
		const cursor = parseInt((req.query.cursor || '0').toString());
		const limit = parseInt((req.query.limit || '10').toString());

		const users = await getChannelUsers(channelId, cursor, limit, res.trx);
		handleServiceResponse(res, users, 'ok');
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
