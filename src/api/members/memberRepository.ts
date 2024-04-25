import { CreateMemberDto, Member } from '@/api/members/memberModel';

export const memberRepository = {
	createMember: async (trx: any, member: CreateMemberDto): Promise<Member> => {
		const ids = await trx.insert(member).into('members');
		return await trx.select('*').from('members').where('userId', ids[0]).first();
	},
	getAllUserChannels: async (trx: any, userId: number): Promise<Member[]> => {
		return await trx.select('*').from('members').where('userId', userId);
	},
	getAllChannelUsers: async (trx: any, channelId: number): Promise<Member[]> => {
		return await trx.select('*').from('members').where('channelId', channelId);
	},
	removeMember: async (trx: any, userId: number, channelId: number): Promise<void> => {
		return await trx.delete().from('members').where('userId', userId).where('channelId', channelId);
	},
};
