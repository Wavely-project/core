import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

export const BaseWorkspaceSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	ownerId: z.number(),
	avatarUrl: z.string().optional(),
});

export type Workspace = z.infer<typeof WorkspaceSchema>;
export const WorkspaceSchema = BaseWorkspaceSchema.extend({
	id: z.number(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export type CreateWorkspace = z.infer<typeof BaseWorkspaceSchema>;

export type CreateWorkspaceDto = Omit<Workspace, 'id' | 'createdAt' | 'updatedAt'>;

// Input Validation for 'GET workspaces/:id' endpoint
export const GetWorkspaceSchema = z.object({
	// params: z.object({ id: commonValidations.id }),
});
export const CreateWorkspaceSchema = z.object({
	body: z.object({
		name: commonValidations.name,
		ownerId: commonValidations.id,
		description: commonValidations.description,
		avatarUrl: commonValidations.avatarUrl,
	}),
});

// import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
// import { z } from 'zod';

// import { commonValidations } from '@/common/utils/commonValidation';

// extendZodWithOpenApi(z);

// const BaseWorkspaceSchema = z.object({
// 	username: z.string(),
// 	email: z.string(),
// 	name: z.string(),
// });

// export type Workspace = z.infer<typeof WorkspaceSchema>;
// export const WorkspaceSchema = BaseUserSchema.extend({
// 	id: z.number(),
// 	bio: z.string().optional(),
// 	password: z.string().optional(),
// 	avatarUrl: z.string().optional(),
// 	status: z.enum(['online', 'offline', 'away']).default('offline').optional(),
// 	createdAt: z.string(),
// 	updatedAt: z.string(),
// });

// export const CreateUserSchema = BaseUserSchema.extend({
// 	password: z.string(),
// });
// export type CreateUser = z.infer<typeof CreateUserSchema>;

// export type CreateUserDto = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

// // Input Validation for 'GET users/:id' endpoint
// export const GetUserSchema = z.object({
// 	params: z.object({ id: commonValidations.id }),
// });
