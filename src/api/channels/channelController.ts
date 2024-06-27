import { Request, Response } from 'express';

import {
	asyncHandler,
	handleServiceResponse,
} from '@/common/utils/httpHandlers';

import { CreateChannelDto } from './channelModel';
import * as channelService from './channelService';

const ChannelController = {
	getById: asyncHandler(async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		const channel = await channelService.getById(id, res.trx);
		handleServiceResponse(res, channel, 'ok');
	}),
	create: asyncHandler(async (req: Request, res: Response) => {
		const { name, description, type, workspaceId } = req.body;

		const createChannelPayload: CreateChannelDto = {
			name,
			description,
			type,
			workspaceId,
			creatorId: res.locals.user.id,
		};
		const channel = await channelService.create(
			createChannelPayload,
			res.trx
		);

		handleServiceResponse(res, channel, 'ok');
	}),
	update: asyncHandler(async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		const { name, description, type } = req.body;
		const channel = await channelService.update(
			id,
			{ name, description, type },
			res.trx
		);
		handleServiceResponse(res, channel, 'ok');
	}),
	delete: asyncHandler(async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		await channelService.remove(id, res.trx);
		handleServiceResponse(res, {}, 'ok');
	}),
	getWorkspaceChannels: asyncHandler(async (req: Request, res: Response) => {
		const workspaceId = parseInt(req.params.id);
		const cursor = parseInt((req.query.cursor || '0').toString());
		const limit = parseInt((req.query.limit || '10').toString());

		const workspaces = await channelService.getWorkspaceChannels(
			workspaceId,
			cursor,
			limit,
			res.trx
		);
		handleServiceResponse(res, workspaces, 'ok');
	}),
};

export default ChannelController;
