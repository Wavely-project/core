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
export type UpdateUser = z.infer<typeof UpdateUserSchema>;

export const GetUserSchema = z.object({
	params: z.object({ id: commonValidations.id }),
});

export const UpdateUserSchema = z.object({
	params: z.object({ id: commonValidations.id }),
	body: z.object({
		name: z.string(),
		email: z.string(),
		password: z.string(),
		bio: z.string().optional(),
	}),
});

export const Users = z.array(UserSchema);
export type UpdateUserDto = z.infer<typeof UpdateUserSchema.shape.body>;
export const DeleteUserSchema = GetUserSchema;
