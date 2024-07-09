import { Request, Response } from 'express';

import {
	asyncHandler,
	handleServiceResponse,
} from '@/common/utils/httpHandlers';

import { CreateInvite } from './invitesModel';
import invitesRepository from './invitesRepository';

const InvitesController = {
	createInvite: asyncHandler(async (req: Request, res: Response) => {
		const { inviteeEmail, workspaceId } = req.body;

		const createInvitePayload: CreateInvite = {
			inviteeEmail,
			workspaceId,
			senderId: res.locals.user.id,
			status: 'pending',
			expiresAt: new Date(Date.now() + 200 * 60 * 60 * 1000),
		};

		const invite = await invitesRepository.createInvite(
			createInvitePayload,
			res.trx
		);
		handleServiceResponse(res, invite, 'ok');
	}),
	getInviteById: asyncHandler(async (req: Request, res: Response) => {
		const id = req.params.id;
		const invite = await invitesRepository.getInviteById(id, res.trx);
		handleServiceResponse(res, invite, 'ok');
	}),

	getWorkspaceInvites: asyncHandler(async (req: Request, res: Response) => {
		const workspaceId = req.params.id;
		const invites = await invitesRepository.getInviteByWorkspaceId(
			workspaceId,
			res.trx
		);
		handleServiceResponse(res, invites, 'ok');
	}),
	updateInvite: asyncHandler(async (req: Request, res: Response) => {
		const id = req.params.id;
		const { status } = req.body;
		const updatedInvite = await invitesRepository.updateInvite(
			id,
			status,
			res.trx
		);
		handleServiceResponse(res, updatedInvite, 'ok');
	}),
	acceptInvite: asyncHandler(async (req: Request, res: Response) => {
		const id = req.params.id;
		await invitesRepository.acceptInvite(id, res.trx);
		handleServiceResponse(res, 'Invite accepted', 'ok');
	}),
	cancelInvite: asyncHandler(async (req: Request, res: Response) => {
		const id = req.params.id;
		await invitesRepository.cancelInvite(id, res.trx);
		handleServiceResponse(res, 'Invite cancelled', 'ok');
	}),
	deleteInvite: asyncHandler(async (req: Request, res: Response) => {
		const id = req.params.id;
		await invitesRepository.deleteInvite(id, res.trx);
		handleServiceResponse(res, 'Invite deleted', 'ok');
	}),
};

export default InvitesController;
