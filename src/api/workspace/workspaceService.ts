import { StatusCodes } from 'http-status-codes';

import { CreateWorkspace, Workspace } from '@/api/workspace/workspaceModel';
import { workspaceRepository } from '@/api/workspace/workspaceRepository';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';
// import { W } from 'vitest/dist/reporters-P7C2ytIv';

export const workspaceService = {
	createWorkspace: async (workspace: CreateWorkspace): Promise<ServiceResponse<Workspace | null>> => {
		try {
			// const workspacePayload: CreateWorkspace = {
			// 	...workspace,
			// };
			const newWorkspace = await workspaceRepository.createWorkspace(workspace);
			if (!newWorkspace) {
				return new ServiceResponse(
					ResponseStatus.Failed,
					'errorCreating Workspace',
					null,
					StatusCodes.INTERNAL_SERVER_ERROR
				);
			}
			return new ServiceResponse<Workspace>(
				ResponseStatus.Success,
				'Workspace created',
				newWorkspace,
				StatusCodes.CREATED
			);
		} catch (ex) {
			const errorMessage = `Error creating Workspace: ${(ex as Error).message}`;
			logger.error(errorMessage);
			return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	},

	// checkEmailExists: async (email: string): Promise<InternalServiceResponse<boolean>> => {
	// 	try {
	// 		const user = await userRepository.findByEmail(email);
	// 		if (!user) {
	// 			return new InternalServiceResponse<boolean>(ResponseStatus.Failed, false);
	// 		}
	// 		return new InternalServiceResponse<boolean>(ResponseStatus.Success, true);
	// 	} catch (ex) {
	// 		const errorMessage = `Error checking if email exists: ${(ex as Error).message}`;
	// 		logger.error(errorMessage);
	// 		return new InternalServiceResponse(ResponseStatus.Failed, false);
	// 	}
	// },

	// usernameExists: async (username: string): Promise<InternalServiceResponse<boolean>> => {
	// 	try {
	// 		const user = await userRepository.findByUsername(username);
	// 		if (!user) {
	// 			return new InternalServiceResponse<boolean>(ResponseStatus.Failed, false);
	// 		}
	// 		return new InternalServiceResponse<boolean>(ResponseStatus.Success, true);
	// 	} catch (ex) {
	// 		const errorMessage = `Error checking if username exists: ${(ex as Error).message}`;
	// 		logger.error(errorMessage);
	// 		return new InternalServiceResponse(ResponseStatus.Failed, false);
	// 	}
	// },

	// // Retrieves all workspaces from the database
	findAllWorkspaces: async (): Promise<ServiceResponse<Workspace[] | null>> => {
		try {
			const workspaces = await workspaceRepository.findAll();
			if (!workspaces) {
				return new ServiceResponse(ResponseStatus.Failed, 'No workspaces found', null, StatusCodes.NOT_FOUND);
			}
			return new ServiceResponse<Workspace[]>(
				ResponseStatus.Success,
				'workspaces found',
				workspaces,
				StatusCodes.OK
			);
		} catch (ex) {
			const errorMessage = `Error finding all workspaces: $${(ex as Error).message}`;
			logger.error(errorMessage);
			return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	},

	// Retrieves a single workspace by their ID
	findWorkspaceById: async (id: number): Promise<ServiceResponse<Workspace | null>> => {
		try {
			const workspace = await workspaceRepository.findById(id);
			if (!workspace) {
				return new ServiceResponse(ResponseStatus.Failed, 'Workspace not found', null, StatusCodes.NOT_FOUND);
			}
			return new ServiceResponse<Workspace>(ResponseStatus.Success, 'Workspace found', workspace, StatusCodes.OK);
		} catch (ex) {
			const errorMessage = `Error finding workspace with id ${id}:, ${(ex as Error).message}`;
			logger.error(errorMessage);
			return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	},
};
