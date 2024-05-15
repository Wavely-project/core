import express, { Router } from 'express';

import { GetUserSchema, UpdateUserSchema } from '@/api/user/userModel';
import {
	checkIdExists,
	RESOURCES,
	validateRequest,
} from '@/common/utils/httpHandlers';

import AuthController from '../auth/authController';
import UserController from './userController';

export const userRouter: Router = (() => {
	const router = express.Router();

	router.get(
		'/:id',
		[
			AuthController.authenticate,
			validateRequest(GetUserSchema),
			checkIdExists('id', RESOURCES.USER),
		],
		UserController.getById
	);
	router.patch(
		'/:id',
		[
			AuthController.authenticate,
			validateRequest(UpdateUserSchema),
			checkIdExists('id', RESOURCES.USER),
		],
		UserController.update
	);
	router.delete(
		'/:id',
		[AuthController.authenticate, validateRequest(GetUserSchema)],
		UserController.delete
	);
	router.get(
		'/:id/workspaces',
		[AuthController.authenticate, validateRequest(GetUserSchema)],
		UserController.getWorkspaces
	);

	return router;
})();
