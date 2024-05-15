import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Router } from 'express';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { messageResponse } from '@/common/utils/commonResponses';

import { validateRequest } from '../../common/utils/httpHandlers';
import notificationsController from './notificationsController';
import { notificationIdSchema, notificationSchema } from './notificationsModel';

export const notificationsRegistry = new OpenAPIRegistry();
notificationsRegistry.register('Notifications', notificationSchema);

export const notificationRouter: Router = (() => {
	const router = express.Router();

	notificationsRegistry.registerPath({
		method: 'get',
		path: '/notifications/{id}',
		tags: ['Notifications'],
		request: {
			params: notificationIdSchema.shape.params,
		},
		responses: createApiResponse(notificationSchema, 'Success'),
	});

	router.get(
		'/:id',
		validateRequest(notificationIdSchema),
		notificationsController.create
	);

	notificationsRegistry.registerPath({
		method: 'patch',
		path: '/notifications/{id}/read',
		tags: ['Notifications'],
		request: { params: notificationIdSchema.shape.params },
		responses: createApiResponse(notificationSchema, 'Success'),
	});

	router.patch(
		'/:id/read',
		validateRequest(notificationIdSchema),
		notificationsController.markAsRead
	);

	notificationsRegistry.registerPath({
		method: 'patch',
		path: '/notifications/{id}/unread',
		tags: ['Notifications'],
		request: { params: notificationIdSchema.shape.params },
		responses: createApiResponse(notificationSchema, 'Success'),
	});

	router.patch(
		'/:id/unread',
		validateRequest(notificationIdSchema),
		notificationsController.markAsRead
	);

	notificationsRegistry.registerPath({
		method: 'delete',
		path: '/notifications/{id}',
		tags: ['Notifications'],
		request: { params: notificationIdSchema.shape.params },
		responses: createApiResponse(messageResponse, 'Success'),
	});

	router.delete(
		'/',
		validateRequest(notificationIdSchema),
		notificationsController.delete
	);

	return router;
})();
