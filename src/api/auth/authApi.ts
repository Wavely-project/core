import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import { UserSchema } from '@/api/user/userModel';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';

import { loginSchema, signupSchema, tokenSchema } from './authModel';

export const authRegistry = new OpenAPIRegistry();

authRegistry.registerPath({
	method: 'post',
	path: '/auth/signup',
	tags: ['Auth'],
	request: {
		body: {
			content: {
				'application/json': {
					schema: signupSchema.shape.body,
				},
			},
		},
	},
	responses: createApiResponse(UserSchema, 'Success'),
});

authRegistry.registerPath({
	method: 'post',
	path: '/auth/login',
	tags: ['Auth'],
	request: {
		body: {
			content: {
				'application/json': {
					schema: loginSchema.shape.body,
				},
			},
		},
	},
	responses: createApiResponse(tokenSchema, 'Success'),
});
