import { Request, Response } from 'express';

import { handleServiceResponse } from '../../common/utils/httpHandlers';
import { CreateWorkspace } from './workspaceModel';
import { workspaceService } from './workspaceService';

const WorkspaceController = {
	getWorkspaces: async (req: Request, res: Response) => {
		// const id = parseInt(req.params.id);
		const serviceResponse = await workspaceService.findAll();
		handleServiceResponse(serviceResponse, res);
	},
	createWorkspace: async (req: Request, res: Response) => {
		const { name, description, ownerId, avatarUrl } = req.body;

		const createUserPayload: CreateWorkspace = {
			name,
			description,
			ownerId,
			avatarUrl,
		};

		const serviceResponse = await workspaceService.createWorkspace(createUserPayload);
		handleServiceResponse(serviceResponse, res);
	},
};

export default WorkspaceController;
