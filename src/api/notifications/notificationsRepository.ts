import db from '../../../db/db';
import { CreateNotificationDto, Notification } from './notificationsModel';

const notificationsRepository = {
	createNotification: async (notification: CreateNotificationDto): Promise<Notification> => {
		const ids = await db('notifications').insert(notification);
		const newNotification = await db('notifications').where('id', ids[0]).first();
		return newNotification;
	},
	getNotificationById: async (id: number): Promise<Notification | null> => {
		return await db.select('*').from('notifications').where('id', id).first();
	},
	getNotificationsByRecipientId: async (recipientId: number): Promise<Notification[]> => {
		return await db.select('*').from('notifications').where('recipientId', recipientId);
	},
	getUnreadNotificationsByRecipientId: async (recipientId: number): Promise<Notification[]> => {
		return await db.select('*').from('notifications').where('recipientId', recipientId).andWhere('isRead', false);
	},
	markAsRead: async (id: number): Promise<void> => {
		await db('notifications').where('id', id).update({ isRead: true });
	},
	deleteNotification: async (id: number): Promise<void> => {
		await db('notifications').where('id', id).del();
	},
};

export default notificationsRepository;
