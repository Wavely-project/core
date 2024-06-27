import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

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
	params: z.object({ id: commonValidations.id }),
});
export type UpdateMessage = z.infer<typeof UpdateMessageSchema.shape.body>;

export const DeleteMessageSchema = z.object({
	params: z.object({ id: commonValidations.id }),
});

export const GetMessageSchema = z.object({
	params: z.object({ id: commonValidations.id }),
});

export const GetChannelMessagesSchema = z.object({
	params: z.object({ id: commonValidations.id }),
});

export const GetChannelThreadsSchema = z.object({
	params: z.object({ id: commonValidations.id }),
});

export const GetThreadSchema = z.object({
	params: z.object({ id: commonValidations.id }),
});

export type deleteMessageData = {
	id: number;
	channelId: number;
	workspaceId: number;
};

export const Messages = z.array(MessageSchema);
