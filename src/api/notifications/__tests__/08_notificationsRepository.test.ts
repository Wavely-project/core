import db from '../../../../db/db';
import EntityFactory from '../../../common/__tests__/entityFactory';
import notificationsRepository from '../notificationsRepository';

describe('notificationRepository', () => {
	let trx: any;
	beforeAll(async () => {
		trx = await db.transaction();
		await trx.schema.alterTable('notifications', (table: any) => {
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
	afterEach(async () => {
		await trx.rollback();
	});
	test('createNotification', async () => {
		trx = await db.transaction();
		const notification = await notificationsRepository.createNotification(trx, {
			recipientId: 5,
			messageId: 2,
			type: 'mention',
			isRead: false,
		});
		expect(notification.id).not.toBeNull();
		// await notificationsRepository.deleteNotification(notification.id);
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
		trx = await db.transaction();
		await notificationsRepository.deleteNotification(trx, 1);
		const notification = await trx('notifications').where('id', 1);
		expect(notification).toHaveLength(0);
	});

	afterAll(async () => {
		trx = await db.transaction();
		await EntityFactory.deleteNotifications([1, 2, 3, 4]);
		await trx.schema.alterTable('notifications', (table: any) => {
			table.foreign('recipientId').references('id').inTable('users');
			table.foreign('messageId').references('id').inTable('messages');
		});
	});
});
