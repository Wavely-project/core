import { Request, Response } from 'express';

import { handleServiceResponse } from '../../common/utils/httpHandlers';
import { CreateWorkspace } from './workspaceModel';
import { workspaceService } from './workspaceService';

const WorkspaceController = {
	getWorkspaces: async (req: Request, res: Response) => {
		const ownerId = res.locals.user.id;
		const serviceResponse = await workspaceService.findAllUserWorkspaces(ownerId);
		//if there is no workspace found, return a 404 status code
		handleServiceResponse(serviceResponse, res);
	},
	getWorkspaceById: async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		const serviceResponse = await workspaceService.findWorkspaceById(id);
		handleServiceResponse(serviceResponse, res);
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

		const serviceResponse = await workspaceService.createWorkspace(createUserPayload);
		handleServiceResponse(serviceResponse, res);
	},
};

export default WorkspaceController;
