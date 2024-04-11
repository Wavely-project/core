import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

extendZodWithOpenApi(z);

const BaseUserSchema = z.object({
	username: z.string(),
	email: z.string(),
	name: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export const UserSchema = BaseUserSchema.extend({
	id: z.number(),
	bio: z.string().optional(),
	password: z.string().optional(),
	avatarUrl: z.string().optional(),
	status: z.enum(['online', 'offline', 'away']).default('offline').optional(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const CreateUserSchema = BaseUserSchema.extend({
	password: z.string(),
});
export type CreateUser = z.infer<typeof CreateUserSchema>;

export type CreateUserDto = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

// Input Validation for 'GET users/:id' endpoint
export const GetUserSchema = z.object({
	params: z.object({ id: commonValidations.id }),
});
