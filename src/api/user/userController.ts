import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
	asyncHandler,
	handleServiceResponse,
} from '@/common/utils/httpHandlers';

import { UpdateUserDto } from './userModel';
import userService from './userService';

const UserController = {
	getById: asyncHandler(async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		const user = await userService.getById(id, res.trx);
		if (!user) {
			handleServiceResponse(
				res,
				null,
				'User not found',
				StatusCodes.NOT_FOUND
			);
			return;
		}
		handleServiceResponse(res, user, 'ok');
	}),
	update: asyncHandler(async (req: Request, res: Response) => {
		const { name, email, bio, password } = req.body;
		const updateUserDto: UpdateUserDto = { name, email, bio, password };
		const id = parseInt(req.params.id);
		const user = await userService.updateUser(id, updateUserDto, res.trx);
		handleServiceResponse(res, user, 'ok');
	}),
	delete: asyncHandler(async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		await userService.deleteUser(id, res.trx);
		handleServiceResponse(res, null, 'ok');
	}),
	getWorkspaces: asyncHandler(async (req: Request, res: Response) => {
		const userId = parseInt(req.params.id);
		const workspaces = await userService.getWorkspaces(userId, res.trx);
		handleServiceResponse(res, workspaces, 'OK');
	}),
};

export default UserController;
