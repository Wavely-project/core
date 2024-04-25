import { z } from 'zod';

export const BaseCoworkerSchema = z.object({
	userId: z.number(),
	workspaceId: z.number(),
});

export const CoworkerSchema = BaseCoworkerSchema.extend({
	createdAt: z.string(),
});

export type Coworker = z.infer<typeof CoworkerSchema>;
export type CreateCoworker = z.infer<typeof BaseCoworkerSchema>;
export type CreateCoworkerDto = Omit<Coworker, 'createdAt'>;

// Input Validation for 'GET Coworker/:id' endpoint
export const CreateCoworkerSchema = z.object({
	body: z.object({
		userId: z.number(),
		channelId: z.number(),
	}),
});
