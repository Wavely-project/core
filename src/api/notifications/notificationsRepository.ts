import { CreateNotificationDto, Notification } from './notificationsModel';

const notificationsRepository = {
	createNotification: async (trx: any, notification: CreateNotificationDto): Promise<Notification> => {
		const ids = await trx('notifications').insert(notification);
		const newNotification = await trx('notifications').where('id', ids[0]).first();
		return newNotification;
	},
	getNotificationById: async (trx: any, id: number): Promise<Notification | null> => {
		return await trx.select('*').from('notifications').where('id', id).first();
	},
	getNotificationsByRecipientId: async (trx: any, recipientId: number): Promise<Notification[]> => {
		return await trx.select('*').from('notifications').where('recipientId', recipientId);
	},
	getUnreadNotificationsByRecipientId: async (trx: any, recipientId: number): Promise<Notification[]> => {
		return await trx.select('*').from('notifications').where('recipientId', recipientId).andWhere('isRead', false);
	},
	markAsRead: async (trx: any, id: number): Promise<void> => {
		await trx('notifications').where('id', id).update({ isRead: true });
	},
	deleteNotification: async (trx: any, id: number): Promise<void> => {
		await trx('notifications').where('id', id).del();
	},
};

export default notificationsRepository;
