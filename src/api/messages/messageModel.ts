import { z } from 'zod';

// content string
//   sender_id uuid fk
//   channel_id uuid fk
//   parent_message_id uuid fk
//   workspace_id uuid fk
export const BaseMessageSchema = z.object({
	content: z.string(),
	senderId: z.number(),
	channelId: z.number(),
	workspaceId: z.number(),
	parentMessageId: z.number(),
});

export const MessageSchema = BaseMessageSchema.extend({
	id: z.number(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export type Message = z.infer<typeof MessageSchema>;
export type CreateMessage = z.infer<typeof BaseMessageSchema>;
export type CreateMessageDto = Omit<Message, 'id' | 'createdAt | updatedAt'>;

export const CreateMessageSchema = z.object({
	body: z.object({
		content: z.string(),
		senderId: z.number(),
		channelId: z.number(),
		workspaceId: z.number(),
		parentMessageId: z.number(),
	}),
});
