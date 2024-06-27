import { Request, Response } from 'express';

import {
	asyncHandler,
	handleServiceResponse,
} from '@/common/utils/httpHandlers';

import { CreateWorkspace, UpdateWorkspace } from './workspaceModel';
import workspaceService from './workspaceService';

const WorkspaceController = {
	getWorkspaceById: asyncHandler(async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		const workspace = await workspaceService.getById(id, res.trx);
		handleServiceResponse(res, workspace, 'ok');
	}),
	createWorkspace: asyncHandler(async (req: Request, res: Response) => {
		const { name, description, avatarUrl } = req.body;
		const ownerId = res.locals.user.id;
		const createWorkspacePayload: CreateWorkspace = {
			name,
			description,
			ownerId,
			avatarUrl,
		};
		const workspace = await workspaceService.create(
			createWorkspacePayload,
			res.trx
		);
		handleServiceResponse(res, workspace, 'ok');
	}),
	updateWorkspace: asyncHandler(async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		const { name, description, avatarUrl } = req.body;
		const updateWorkspacePayload: UpdateWorkspace = {
			name,
			description,
			avatarUrl,
		};
		const workspace = await workspaceService.update(
			id,
			updateWorkspacePayload,
			res.trx
		);

		handleServiceResponse(res, workspace, 'ok');
	}),
	deleteWorkspace: asyncHandler(async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		await workspaceService.delete(id, res.trx);

		handleServiceResponse(res, {}, 'ok');
	}),
};

export default WorkspaceController;
