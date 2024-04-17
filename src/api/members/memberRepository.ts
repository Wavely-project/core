import { CreateMemberDto, Member } from '@/api/members/memberModel';

import db from '../../../db/db';

export const memberRepository = {
	createMember: async (member: CreateMemberDto): Promise<Member> => {
		const ids = await db('members').insert(member);
		const newMember = await db('members').where('userId', ids[0]).first();
		return newMember;
	},
	getAllUserChannels: async (userId: number): Promise<Member[]> => {
		return await db.select('*').from('members').where('userId', userId);
	},
	getAllChannelUsers: async (channelId: number): Promise<Member[]> => {
		return await db.select('*').from('members').where('channelId', channelId);
	},
	removeMember: async (userId: number, channelId: number): Promise<void> => {
		await db('members').where('userId', userId).where('channelId', channelId).delete();
	},
};
