import { Knex } from 'knex';

import userService from '../user/userService';
import { memberRepository } from './memberRepository';

export async function getChannelUsers(
	channelId: number,
	cursor: number,
	limit: number,
	trx: Knex.Transaction
) {
	const usersIds = await memberRepository.getAllChannelUsers(
		channelId,
		cursor,
		limit,
		trx
	);

	return userService.getByIds(usersIds, trx);
}
