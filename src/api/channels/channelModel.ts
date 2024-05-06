import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

export const BaseChannelSchema = z.object({
	name: z.string(),
	description: z.string(),
	type: z.enum(['public', 'private', 'direct']),
	workspaceId: z.number(),
	creatorId: z.number(),
});

export type Channel = z.infer<typeof ChannelSchema>;
export const ChannelSchema = BaseChannelSchema.extend({
	id: z.number(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export type CreateChannel = z.infer<typeof BaseChannelSchema>;

export type CreateChannelDto = Omit<Channel, 'id' | 'createdAt' | 'updatedAt'>;

// Input Validation for 'GET Channel /:id' endpoint
export const GetChannelSchema = z.object({
	params: z.object({ id: commonValidations.id }),
});
export const CreateChannelSchema = z.object({
	body: z.object({
		name: z.string(),
		description: z.string(),
		type: z.enum(['public', 'private', 'direct']),
		workspaceId: commonValidations.id,
	}),
});

export type DeleteChannelData = Omit<
	Channel,
	'createdAt' | 'updatedAt' | 'name' | 'description' | 'type' | 'creatorId'
>;
