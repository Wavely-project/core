import { Request, Response } from 'express';

import { CreateNotificationDto } from './notificationsModel';

const notificationsController = {
	create: (req: Request, res: Response) => {
		const { recipientId, messageId, type, isRead } = req.body;

		const createNotificationDto: CreateNotificationDto = {
			recipientId,
			messageId,
			type,
			isRead,
		};

		console.log(createNotificationDto);

		res.status(201).json(createNotificationDto);
	},
	getById: (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		console.log(id);

		res.status(200).json({ id });
	},
	markAsRead: (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		console.log(id);

		res.status(200).json({ id });
	},
	markAsUnread: (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		console.log(id);
		res.status(200).json({ id });
	},
	delete: (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		console.log(id);

		res.status(200).json({ message: 'Notification deleted' });
	},
};

export default notificationsController;
