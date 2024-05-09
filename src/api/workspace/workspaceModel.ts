import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

export const BaseWorkspaceSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	avatarUrl: z.string().optional(),
	ownerId: z.number(),
});

export type Workspace = z.infer<typeof WorkspaceSchema>;
export const WorkspaceSchema = BaseWorkspaceSchema.extend({
	id: z.number(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export type CreateWorkspace = z.infer<typeof BaseWorkspaceSchema>;

export const CreateWorkspaceSchema = z.object({
	body: z.object({
		name: z.string(),
		description: z.string(),
		avatarUrl: z.string(),
	}),
});

export const GetWorkspaceSchema = z.object({
	params: z.object({ id: commonValidations.id }),
	query: z.object({
		limit: z.string().optional(),
		cursor: z.string().optional(),
	}),
});

export const UpdateWorkspaceSchema = z.object({
	body: z.object({
		name: z.string(),
		description: z.string(),
		avatarUrl: z.string(),
	}),
	params: z.object({ id: commonValidations.id }),
});

export const DeleteWorkspaceSchema = z.object({
	params: z.object({ id: commonValidations.id }),
});
