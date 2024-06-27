import { Knex } from 'knex';

import { CreateChannelDto, updateChannelDto } from './channelModel';
import { channelRepository } from './channelRepository';

export function create(
	createChannelDto: CreateChannelDto,
	trx: Knex.Transaction
) {
	return channelRepository.create(createChannelDto, trx);
}

export function update(
	id: number,
	updateChannelDto: updateChannelDto,
	trx: Knex.Transaction
) {
	return channelRepository.update(id, updateChannelDto, trx);
}

export function getById(id: number, trx: Knex.Transaction) {
	return channelRepository.getById(id, trx);
}

export function remove(id: number, trx: Knex.Transaction) {
	return channelRepository.delete(id, trx);
}

export async function getWorkspaceChannels(
	workspaceId: number,
	cursor: number,
	limit: number,
	trx: Knex.Transaction
) {
	const workspaces = await channelRepository.getWorkspaceChannels(
		workspaceId,
		cursor,
		limit,
		trx
	);
	if (workspaces.length === 0)
		return {
			workspaces: [],
			cursor: null,
			hasNext: false,
		};

	const newCursor = workspaces[workspaces.length - 1].id;
	const nextPage = await channelRepository.getWorkspaceChannels(
		workspaceId,
		newCursor,
		limit,
		trx
	);

	return {
		workspaces,
		cursor: newCursor,
		hasnext: nextPage.length !== 0,
	};
}
