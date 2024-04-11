import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const signupSchema = z.object({
	body: z.object({
		email: z.string(),
		username: z.string(),
		name: z.string(),
		password: z.string(),
	}),
});

export const loginSchema = z.object({
	body: z.object({
		email: z.string(),
		password: z.string(),
	}),
});

export const tokenSchema = z.object({
	token: z.string(),
});
