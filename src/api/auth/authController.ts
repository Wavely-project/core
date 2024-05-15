import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
	asyncHandler,
	handleServiceResponse,
} from '../../common/utils/httpHandlers';
import { CreateUser } from '../user/userModel';
import authService from './authService';

const AuthController = {
	signup: asyncHandler(async (req: Request, res: Response) => {
		const { email, username, name, password } = req.body;
		const createUserPayload: CreateUser = {
			email,
			username,
			name,
			password,
		};

		const data = await authService.signup(createUserPayload, res.trx);
		handleServiceResponse(res, data, 'OK');
	}),
	login: asyncHandler(async (req: Request, res: Response) => {
		const { email, password } = req.body;

		const tokenAndUser = await authService.login(email, password, res.trx);
		handleServiceResponse(res, tokenAndUser, 'OK');
	}),
	authenticate: asyncHandler(
		async (req: Request, res: Response, next: NextFunction) => {
			const user = await authService.authenticate(
				req.headers.authorization || '',
				res.trx
			);
			if (user) {
				res.locals.user = user;
				next();
				return;
			}
			handleServiceResponse(
				res,
				null,
				'TOKENN',
				StatusCodes.UNAUTHORIZED
			);
		}
	),
};

export default AuthController;
