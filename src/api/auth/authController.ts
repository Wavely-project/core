import { NextFunction, Request, Response } from 'express';

import { handleServiceResponse } from '../../common/utils/httpHandlers';
import { CreateUser } from '../user/userModel';
import authService from './authService';

const AuthController = {
	signup: async (req: Request, res: Response) => {
		const { email, username, name, password } = req.body;

		const createUserPayload: CreateUser = {
			email,
			username,
			name,
			password,
		};

		const serviceResponse = await authService.signup(createUserPayload);
		handleServiceResponse(serviceResponse, res);
	},
	login: async (req: Request, res: Response) => {
		const { email, password } = req.body;

		const serviceResponse = await authService.login(email, password);
		handleServiceResponse(serviceResponse, res);
	},
	authenticate: async (req: Request, res: Response, next: NextFunction) => {
		const response = await authService.authenticate(req.headers.authorization || '');
		if (response.success) {
			res.locals.user = response.responseObject;
			return next();
		}

		handleServiceResponse(response, res);
	},
};

export default AuthController;
