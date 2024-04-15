import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const BaseInviteSchema = z.object({
	workspaceId: z.number(),
	inviteeId: z.number(),
	senderId: z.number(),
	expiresAt: z.date(),
	status: z.enum(['pending', 'accepted', 'cancelled']).default('pending'),
});

export type Invite = z.infer<typeof InviteSchema>;
export const InviteSchema = BaseInviteSchema.extend({
	id: z.number(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const CreateInviteSchema = BaseInviteSchema;
export type CreateInviteDto = z.infer<typeof CreateInviteSchema>;
