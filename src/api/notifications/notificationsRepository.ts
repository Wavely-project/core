import { CreateNotificationDto, Notification } from './notificationsModel';

const notificationsRepository = {
	createNotification: async (trx: any, notification: CreateNotificationDto): Promise<Notification> => {
		// const ids = await trx('notifications').insert(notification);
		// const newNotification = await trx('notifications').where('id', ids[0]).first();
		const ids = await trx.insert(notification).into('notifications');
		return await trx.select('*').from('notifications').where('id', ids[0]).first();
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
		return await trx.update({ isRead: true }).from('notifications').where('id', id);
	},
	deleteNotification: async (trx: any, id: number): Promise<void> => {
		return await trx.delete().from('notifications').where('id', id);
	},
};

export default notificationsRepository;
