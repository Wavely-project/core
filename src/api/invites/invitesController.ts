import db from 'db/db';
import { Request, Response } from 'express';

import { CreateInvite } from './invitesModel';
import invitesRepository from './invitesRepository';

const InvitesController = {
	createInvite: async (req: Request, res: Response) => {
		const { inviteeEmail, workspaceId } = req.body;

		const createInvitePayload: CreateInvite = {
			inviteeEmail,
			workspaceId,
			senderId: res.locals.user.id,
			status: 'pending',
			expiresAt: new Date(Date.now() + 200 * 60 * 60 * 1000),
		};

		const invite = await invitesRepository.createInvite(
			db,
			createInvitePayload
		);
		res.json(invite);
	},
	getInviteById: async (req: Request, res: Response) => {
		const id = req.params.id;
		const invite = await invitesRepository.getInviteById(db, id);
		res.json(invite);
	},

	getWorkspaceInvites: async (req: Request, res: Response) => {
		const workspaceId = req.params.id;
		const invites = await invitesRepository.getInviteByWorkspaceId(
			db,
			workspaceId
		);
		res.json(invites);
	},
	acceptInvite: async (req: Request, res: Response) => {
		const id = req.params.id;
		await invitesRepository.acceptInvite(db, id);
		res.sendStatus(200);
	},
	cancelInvite: async (req: Request, res: Response) => {
		const id = req.params.id;
		await invitesRepository.cancelInvite(db, id);
		res.sendStatus(200);
	},
};

export default InvitesController;
