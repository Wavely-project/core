import db from '../../../../db/db';
import EntityFactory from '../../../common/__tests__/entityFactory';
import notificationsRepository from '../notificationsRepository';

describe('notificationRepository', () => {
	beforeAll(async () => {
		await db.schema.alterTable('notifications', (table) => {
			table.dropForeign('recipientId');
			table.dropForeign('messageId');
		});
		await Promise.all([
			EntityFactory.createNotification(1, 1, 1, 'mention'),
			EntityFactory.createNotification(2, 1, 2, 'newMessage', true),
			EntityFactory.createNotification(3, 2, 3, 'invite'),
			EntityFactory.createNotification(4, 2, 4, 'invite'),
		]);
	});

	test('createNotification', async () => {
		const notification = await notificationsRepository.createNotification({
			recipientId: 5,
			messageId: 2,
			type: 'mention',
			isRead: false,
		});
		expect(notification.id).toBe(5);
		await notificationsRepository.deleteNotification(5);
	});

	test('getNotificationByRecipientId', async () => {
		const notifications = await notificationsRepository.getNotificationsByRecipientId(2);
		expect(notifications).toHaveLength(2);
	});

	test('getUnreadNotificationsByRecipientId', async () => {
		const notifications = await notificationsRepository.getUnreadNotificationsByRecipientId(1);
		expect(notifications).toHaveLength(1);
	});

	test('markAsRead', async () => {
		await notificationsRepository.markAsRead(1);
		const notification = await db('notifications').where('id', 1).first();
		expect(notification.isRead).toBe(1);
	});

	test('deleteNotification', async () => {
		await notificationsRepository.deleteNotification(1);
		const notification = await db('notifications').where('id', 1);
		expect(notification).toHaveLength(0);
	});

	afterAll(async () => {
		await EntityFactory.deleteNotifications([1, 2, 3, 4, 5]);
		await db.schema.alterTable('notifications', (table) => {
			table.foreign('recipientId').references('id').inTable('users');
			table.foreign('messageId').references('id').inTable('messages');
		});
	});
});
