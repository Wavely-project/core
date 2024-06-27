import express, { Router } from 'express';

import { validateRequest } from '@/common/utils/httpHandlers';

import AuthController from '../auth/authController';
import MessageController from './messageController';
import {
	CreateMessageSchema,
	DeleteMessageSchema,
	GetMessageSchema,
	UpdateMessageSchema,
} from './messageModel';

export const messagesRouter: Router = (() => {
	const router = express.Router();

	router.post(
		'/',
		[AuthController.authenticate, validateRequest(CreateMessageSchema)],
		MessageController.sendMessage
	);

	router.get(
		'/:id',
		[AuthController.authenticate, validateRequest(GetMessageSchema)],
		MessageController.getMessageById
	);

	router.patch(
		'/:id',
		[AuthController.authenticate, validateRequest(UpdateMessageSchema)],
		MessageController.editMessage
	);

	router.delete(
		'/:id',
		[AuthController.authenticate, validateRequest(DeleteMessageSchema)],
		MessageController.deleteMessage
	);

	return router;
})();
