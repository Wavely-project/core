import express, { Router } from 'express';

import { validateRequest } from '@/common/utils/httpHandlers';

import AuthController from '../auth/authController';
import InvitesController from './invitesController';
import { CreateInviteSchema } from './invitesModel';

export const inviteRouter: Router = (() => {
	const router = express.Router();

	router.post(
		'/',
		[AuthController.authenticate, validateRequest(CreateInviteSchema)],
		InvitesController.createInvite
	);

	router.get(
		'/:id',
		[AuthController.authenticate],
		InvitesController.getInviteById
	);
	router.patch(
		'/:id',
		[AuthController.authenticate],
		InvitesController.updateInvite
	);
	router.patch(
		'/:id/acceptInvite',
		[AuthController.authenticate],
		InvitesController.acceptInvite
	);
	router.patch(
		'/:id/cancelInvite',
		[AuthController.authenticate],
		InvitesController.cancelInvite
	);
	router.delete(
		'/:id',
		[AuthController.authenticate],
		InvitesController.deleteInvite
	);

	return router;
})();
