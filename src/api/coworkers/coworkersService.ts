import { Knex } from 'knex';

import userService from '../user/userService';
import { Coworker } from './coworkersModel';
import { coworkerRepository } from './coworkersRepository';

const coworkersService = {
	getUserWorkspaces: async (userId: number, trx: Knex.Transaction) => {
		const rows = await coworkerRepository.getWorkspacesIds(userId, trx);
		return rows.map((row: Coworker) => row.workspaceId);
	},
	getWorkspaceUsers: async (
		workspaceId: number,
		cursor: number,
		limit: number,
		trx: Knex.Transaction
	) => {
		const usersIds = await coworkerRepository.getUsersIds(
			workspaceId,
			cursor,
			limit,
			trx
		);
		if (usersIds.length === 0)
			return {
				users: [],
				cursor: null,
				hasNext: false,
			};
		const userIdArray = usersIds.map((row: Coworker) => row.userId);
		const users = await userService.getByIds(userIdArray, trx);

		const newCursor = users[users.length - 1].id;

		const nextPage = await coworkerRepository.getUsersIds(
			workspaceId,
			newCursor,
			limit,
			trx
		);
		return {
			users,
			cursor: newCursor,
			hasNext: nextPage.length !== 0,
		};
	},
};

export default coworkersService;
