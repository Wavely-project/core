import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

extendZodWithOpenApi(z);

export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
	id: z.number(),
	username: z.string(),
	email: z.string(),
	password: z.string(),
	bio: z.string().optional(),
	avatarUrl: z.string().optional(),
	status: z.enum(['online', 'offline', 'away']).default('offline'),
	createdAt: z.string(),
	updatedAt: z.string(),
});

// Input Validation for 'GET users/:id' endpoint
export const GetUserSchema = z.object({
	params: z.object({ id: commonValidations.id }),
});
