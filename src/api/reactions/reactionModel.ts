import { z } from 'zod';
// id uuid pk
// user_id uuid fk
// message_id uuid fk
// reaction string

export const BaseReactionSchema = z.object({
	userId: z.number(),
	messageId: z.number(),
	reaction: z.string(),
});

export const ReactionSchema = BaseReactionSchema.extend({
	id: z.number(),
});

export type Reaction = z.infer<typeof ReactionSchema>;
export type CreateReaction = z.infer<typeof BaseReactionSchema>;
export type CreateReactionDto = Omit<Reaction, 'id'>;

export const CreateReactionSchema = z.object({
	body: z.object({
		userId: z.number(),
		messageId: z.number(),
		reaction: z.string(),
	}),
});
