import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const BaseNotificationSchema = z.object({
	recipientId: z.number(),
	messageId: z.number(),
	type: z.enum(['mention', 'newMessage', 'invite']),
	isRead: z.boolean(),
});

export const notificationSchema = BaseNotificationSchema.extend({
	id: z.number(),
	createdAt: z.date(),
});

export type Notification = z.infer<typeof notificationSchema>;

export const CreateNotificationSchema = BaseNotificationSchema;
export type CreateNotificationDto = z.infer<typeof CreateNotificationSchema>;
