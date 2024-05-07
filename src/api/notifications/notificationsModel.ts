import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

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

export const notificationIdSchema = z.object({
	params: z.object({
		id: commonValidations.id,
	}),
});
export type NotificationId = z.infer<typeof notificationIdSchema>;

export const notificationIdsSchema = z.object({
	params: z.object({
		ids: z.array(commonValidations.id),
	}),
});
