import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const BaseInviteSchema = z.object({
	workspaceId: z.number(),
	senderId: z.number(),
	status: z.enum(['pending', 'accepted', 'cancelled']).default('pending'),
	expiresAt: z.date(),
	inviteeEmail: z.string().email(),
});

export const InviteSchema = BaseInviteSchema.extend({
	id: z.number(),
	createdAt: z.date(),
	updatedAt: z.date(),
});
export type Invite = z.infer<typeof InviteSchema>;
export type CreateInvite = z.infer<typeof BaseInviteSchema>;
export type CreateInviteDto = Omit<Invite, 'id' | 'createdAt' | 'updatedAt'>;
export const CreateInviteSchema = z.object({
	body: z.object({
		inviteeEmail: z.string().email(),
		workspaceId: z.number(),
	}),
});
export const GetInviteSchema = z.object({
	params: z.object({ id: z.number() }),
});

export const UpdateInviteSchema = z.object({
	body: z.object({
		status: z.enum(['pending', 'accepted', 'cancelled']),
	}),
	params: z.object({ id: z.number() }),
});

export const DeleteInviteSchema = z.object({
	params: z.object({ id: z.number() }),
});

export const GetWorkspaceInvitesSchema = z.object({
	params: z.object({ id: z.number() }),
});
