import { CreateMemberDto, Member } from '@/api/members/memberModel';

export const memberRepository = {
	createMember: async (
		member: CreateMemberDto,
		trx: any
	): Promise<Member> => {
		const ids = await trx.insert(member).into('members');
		return trx.select('*').from('members').where('userId', ids[0]).first();
	},
	getAllUserChannels: (userId: number, trx: any): Promise<Member[]> => {
		return trx.select('*').from('members').where('userId', userId);
	},
	getAllChannelUsers: (
		channelId: number,
		cursor: number,
		limit: number,
		trx: any
	): Promise<number[]> => {
		return trx
			.select('userId')
			.from('members')
			.where('channelId', channelId)
			.andWhere('id', '>', cursor)
			.limit(limit);
	},
	removeMember: (
		userId: number,
		channelId: number,
		trx: any
	): Promise<void> => {
		return trx
			.delete()
			.from('members')
			.where('userId', userId)
			.where('channelId', channelId);
	},
};
