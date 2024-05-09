import { z } from 'zod';

import { User } from '../user/userModel';

export const BaseMemberSchema = z.object({
	userId: z.number(),
	channelId: z.number(),
});

export const MemberSchema = BaseMemberSchema.extend({
	createdAt: z.string(),
});

export type Member = z.infer<typeof MemberSchema>;
export type CreateMember = z.infer<typeof BaseMemberSchema>;
export type CreateMemberDto = Omit<Member, 'createdAt'>;

// Input Validation for 'GET member/:id' endpoint
export const CreateMemberSchema = z.object({
	body: z.object({
		userId: z.number(),
		channelId: z.number(),
	}),
});

export type MemberData = Member & { userData: User };
