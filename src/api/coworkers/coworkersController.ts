import { Request, Response } from 'express';

import { CreateCoworker } from './coworkersModel';

const CoworkersController = {
	getWorkspaceUsers: async (req: Request, res: Response) => {
		const workspaceId = parseInt(req.params.id);
		res.json({ workspaceId });
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
