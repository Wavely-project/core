import { z } from 'zod';

export const BaseMessageSchema = z.object({
	content: z.string(),
	senderId: z.number(),
	channelId: z.number(),
	parentMessageId: z.number().nullable(),
});

export const MessageSchema = BaseMessageSchema.extend({
	id: z.number(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export type Message = z.infer<typeof MessageSchema>;
export type CreateMessage = z.infer<typeof BaseMessageSchema>;
export type CreateMessageDto = Omit<Message, 'id' | 'createdAt' | 'updatedAt'>;

export const CreateMessageSchema = z.object({
	body: z.object({
		content: z.string(),
		senderId: z.number(),
		channelId: z.number(),
		workspaceId: z.number(),
		parentMessageId: z.any(),
	}),
});

export const UpdateMessageSchema = z.object({
	body: z.object({
		content: z.string(),
	}),
	params: z.object({ id: z.number() }),
});

export const DeleteMessageSchema = z.object({
	params: z.object({ id: z.number() }),
});

export const GetMessageSchema = z.object({
	params: z.object({ id: z.number() }),
	query: z.object({
		cursor: z.string().optional(),
		limit: z.string().optional(),
	}),
});

export const GetChannelMessagesSchema = z.object({
	params: z.object({ id: z.number() }),
});

export const GetChannelThreadsSchema = z.object({
	params: z.object({ id: z.number() }),
});

export const GetThreadSchema = z.object({
	params: z.object({ id: z.number() }),
});

export const Messages = z.array(MessageSchema);
