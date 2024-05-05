import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Router } from 'express';

import { GetUserSchema, UpdateUserSchema, UserSchema } from '@/api/user/userModel';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { validateRequest } from '@/common/utils/httpHandlers';

import AuthController from '../auth/authController';
import UserController from './userController';

export const userRegistry = new OpenAPIRegistry();

const bearerAuth = userRegistry.registerComponent('securitySchemes', 'bearerAuth', {
	type: 'http',
	scheme: 'bearer',
	bearerFormat: 'JWT',
});

userRegistry.register('User', UserSchema);

export const userRouter: Router = (() => {
	const router = express.Router();

	userRegistry.registerPath({
		method: 'get',
		path: '/users/{id}',
		tags: ['User'],
		security: [{ [bearerAuth.name]: [] }],
		request: { params: GetUserSchema.shape.params },
		responses: createApiResponse(UserSchema, 'Success'),
	});

	router.get('/:id', [AuthController.authenticate, validateRequest(GetUserSchema)], UserController.getUserById);
	userRegistry.registerPath({
		method: 'put',
		path: '/users/{id}',
		tags: ['User'],
		security: [{ [bearerAuth.name]: [] }],
		request: {
			params: GetUserSchema.shape.params,
			body: {
				content: {
					'application/json': {
						schema: UpdateUserSchema.shape.body,
					},
				},
			},
		},
		responses: createApiResponse(UserSchema, 'Success'),
	});
	router.put('/:id', [AuthController.authenticate, validateRequest(GetUserSchema)], UserController.updateUser);
	userRegistry.registerPath({
		method: 'delete',
		path: '/users/{id}',
		tags: ['User'],
		security: [{ [bearerAuth.name]: [] }],
		request: { params: GetUserSchema.shape.params },
		responses: createApiResponse(UserSchema, 'Success'),
	});
	router.delete('/:id', [AuthController.authenticate, validateRequest(GetUserSchema)], UserController.deleteUser);

	return router;
})();
