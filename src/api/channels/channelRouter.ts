import express, { Router } from 'express';

import {
	CreateChannelSchema,
	DeleteChannelSchema,
	GetChannelSchema,
	UpdateChannelSchema,
} from '@/api/channels/channelModel';
import { validateRequest } from '@/common/utils/httpHandlers';

import AuthController from '../auth/authController';
import MembersController from '../members/memberController';
import MessageController from '../messages/messageController';
import ChannelController from './channelController';

export const channelRouter: Router = (() => {
	const router = express.Router();

	router.post(
		'/',
		[AuthController.authenticate, validateRequest(CreateChannelSchema)],
		ChannelController.create
	);

	router.get(
		'/:id',
		[AuthController.authenticate, validateRequest(GetChannelSchema)],
		ChannelController.getById
	);

	router.patch(
		'/:id',
		[AuthController.authenticate, validateRequest(UpdateChannelSchema)],
		ChannelController.update
	);

	router.delete(
		'/:id',
		[AuthController.authenticate, validateRequest(DeleteChannelSchema)],
		ChannelController.delete
	);

	router.get(
		'/:id/users',
		[AuthController.authenticate, validateRequest(GetChannelSchema)],
		MembersController.getChannelUsers
	);

	router.get(
		'/:id/messages',
		[AuthController.authenticate, validateRequest(GetChannelSchema)],
		MessageController.getChannelMessages
	);

	return router;
})();
