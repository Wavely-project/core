import express, { Router } from 'express';

import { validateRequest } from '../../common/utils/httpHandlers';
import AuthController from './authController';
import { loginSchema, signupSchema } from './authModel';

export const authRouter: Router = (() => {
	const router = express.Router();

	router.post(
		'/signup',
		validateRequest(signupSchema),
		AuthController.signup
	);
	router.post('/login', validateRequest(loginSchema), AuthController.login);

	return router;
})();
