import express, { Router } from 'express';

import * as Schemas from '@/api/workspace/workspaceModel';
import { validateRequest } from '@/common/utils/httpHandlers';

import AuthController from '../auth/authController';
import ChannelController from '../channels/channelController';
import CoworkersController from '../coworkers/coworkersController';
import WorkspaceController from './workspaceController';

export const workspaceRouter: Router = (() => {
	const router = express.Router();

	router.post(
		'/',
		[
			AuthController.authenticate,
			validateRequest(Schemas.CreateWorkspaceSchema),
		],
		WorkspaceController.createWorkspace
	);

	router.get(
		'/:id',
		[
			AuthController.authenticate,
			validateRequest(Schemas.GetWorkspaceSchema),
		],
		WorkspaceController.getWorkspaceById
	);

	router.patch(
		'/:id',
		[
			AuthController.authenticate,
			validateRequest(Schemas.UpdateWorkspaceSchema),
		],
		WorkspaceController.updateWorkspace
	);

	router.delete(
		'/:id',
		[
			AuthController.authenticate,
			validateRequest(Schemas.DeleteWorkspaceSchema),
		],
		WorkspaceController.deleteWorkspace
	);

	router.get(
		'/:id/users',
		[
			AuthController.authenticate,
			validateRequest(Schemas.GetWorkspaceSchema),
		],
		CoworkersController.getWorkspaceUsers
	);

	router.get(
		'/:id/channels',
		[
			AuthController.authenticate,
			validateRequest(Schemas.GetWorkspaceSchema),
		],
		ChannelController.getWorkspaceChannels
	);

	router.get(
		'/:id/threads',
		[
			AuthController.authenticate,
			validateRequest(Schemas.GetWorkspaceSchema),
		],
		ChannelController.getWorkspaceThreads
	);

	return router;
})();
