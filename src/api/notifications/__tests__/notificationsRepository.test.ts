import { mockedTxn } from '../../../common/__tests__/mocks';
import notificationsRepository from '../notificationsRepository';

describe('notificationRepository', () => {
	const trx: any = mockedTxn;

	afterEach(() => {
		vi.clearAllMocks();
	});

	test('createNotification', async () => {
		const notificationData = {
			recipientId: 5,
			messageId: 2,
			type: 'mention' as 'mention' | 'newMessage' | 'invite',
			isRead: false,
		};
		await notificationsRepository.createNotification(trx, notificationData);
		expect(trx.insert).toBeCalledWith(notificationData);
		expect(trx.into).toBeCalledWith('notifications');
	});

	test('getNotificationByRecipientId', async () => {
		await notificationsRepository.getNotificationsByRecipientId(trx, 2);
		expect(trx.select).toBeCalledWith('*');
		expect(trx.from).toBeCalledWith('notifications');
		expect(trx.where).toBeCalledWith('recipientId', 2);
	});

	test('getUnreadNotificationsByRecipientId', async () => {
		await notificationsRepository.getUnreadNotificationsByRecipientId(
			trx,
			1
		);
		expect(trx.select).toBeCalledWith('*');
		expect(trx.from).toBeCalledWith('notifications');
		expect(trx.where).toBeCalledWith('recipientId', 1);
	});

	test('markAsRead', async () => {
		await notificationsRepository.markAsRead(trx, 1);
		expect(trx.update).toBeCalled();
		expect(trx.from).toBeCalledWith('notifications');
	});

	test('deleteNotification', async () => {
		await notificationsRepository.deleteNotification(trx, 1);
		expect(trx.delete).toBeCalled();
		expect(trx.from).toBeCalledWith('notifications');
	});
});
