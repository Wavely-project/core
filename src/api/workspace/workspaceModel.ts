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

export type CreateWorkspaceDto = Omit<Workspace, 'id' | 'createdAt' | 'updatedAt'>;

// Input Validation for 'GET workspaces/:id' endpoint
export const GetWorkspaceSchema = z.object({
	params: z.object({ id: commonValidations.id }),
});
export const CreateWorkspaceSchema = z.object({
	body: z.object({
		name: z.string(),
		description: z.string(),
		avatarUrl: z.string(),
	}),
});
