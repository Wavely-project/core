import { z } from 'zod';

import { User } from '../user/userModel';

export const BaseCoworkerSchema = z.object({
	userId: z.number(),
	workspaceId: z.number(),
});

export const CoworkerSchema = BaseCoworkerSchema.extend({
	createdAt: z.string(),
});
export const CreateCoworkerSchema = z.object({
	params: z.object({ userId: z.number(), workspaceId: z.number() }),
});

export const GetCoworkersSchema = z.object({
	params: z.object({ workspaceId: z.number() }),
});

export const deleteCoworkerSchema = z.object({
	params: z.object({ userId: z.number(), workspaceId: z.number() }),
});
export type Coworker = z.infer<typeof CoworkerSchema>;
export type CreateCoworker = z.infer<typeof BaseCoworkerSchema>;
export type CreateCoworkerDto = Omit<Coworker, 'createdAt'>;

export type CoworkerData = Coworker & { userData: User };
