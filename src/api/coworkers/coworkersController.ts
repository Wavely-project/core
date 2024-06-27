import { Request, Response } from 'express';

import { handleServiceResponse } from '@/common/utils/httpHandlers';

import { CreateCoworker } from './coworkersModel';
import coworkersService from './coworkersService';

const CoworkersController = {
	getWorkspaceUsers: async (req: Request, res: Response) => {
		const workspaceId = parseInt(req.params.id);
		const cursor = parseInt((req.query.cursor || '0').toString());
		const limit = parseInt((req.query.limit || '10').toString());

		const users = await coworkersService.getWorkspaceUsers(
			workspaceId,
			cursor,
			limit,
			res.trx
		);
		handleServiceResponse(res, users, 'ok');
	},
	getCoworkerById: async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		res.json({ id });
	},
	createCoworker: async (req: Request, res: Response) => {
		const userId = parseInt(req.params.userId);
		const workspaceId = parseInt(req.params.workspaceId);

		const createCoworkerPayload: CreateCoworker = {
			userId,
			workspaceId,
		};
		res.json(createCoworkerPayload);
	},
	updateCoworker: async (req: Request, res: Response) => {
		const userId = parseInt(req.params.userId);
		const workspaceId = parseInt(req.params.workspaceId);
		res.json({ userId, workspaceId });
	},
	deleteCoworker: async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		res.json({ id });
	},
};

export default CoworkersController;
