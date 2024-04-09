import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Router } from 'express';

import { CreateUserSchema, UserSchema } from '@/api/user/userModel';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';

import { validateRequest } from '../../common/utils/httpHandlers';
import AuthController from './authController';
import { loginSchema, signupSchema, tokenSchema } from './authModel';

export const authRegistry = new OpenAPIRegistry();

export const authRouter: Router = (() => {
	const router = express.Router();

	authRegistry.registerPath({
		method: 'post',
		path: '/auth/signup',
		tags: ['Auth'],
		request: {
			body: {
				content: {
					'application/json': {
						schema: CreateUserSchema,
					},
				},
			},
		},
		responses: createApiResponse(UserSchema, 'Success'),
	});

	router.post('/signup', validateRequest(signupSchema), AuthController.signup);

	authRegistry.registerPath({
		method: 'post',
		path: '/auth/login',
		tags: ['Auth'],
		request: {
			body: {
				content: {
					'application/json': {
						schema: loginSchema,
					},
				},
			},
		},
		responses: createApiResponse(tokenSchema, 'Success'),
	});

	router.post('/login', validateRequest(loginSchema), AuthController.login);

	return router;
})();
