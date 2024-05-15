import { Request, Response } from 'express';

import { CreateWorkspace } from './workspaceModel';

const WorkspaceController = {
	getWorkspaceById: async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		res.json({ id });
	},
	createWorkspace: async (req: Request, res: Response) => {
		const { name, description, avatarUrl } = req.body;
		const ownerId = res.locals.user.id;
		const createUserPayload: CreateWorkspace = {
			name,
			description,
			ownerId,
			avatarUrl,
		};
		res.json(createUserPayload);
	},
	updateWorkspace: async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		const { name, description, avatarUrl } = req.body;
		res.json({ id, name, description, avatarUrl });
	},
	deleteWorkspace: async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		res.json({ id });
	},
};

export default WorkspaceController;
