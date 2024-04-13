import db from '../../../db/db';
import { Invite } from '../../api/invites/invitesModel';
import { Thread } from '../../api/threads/threadsModel';

class EntityFactory {
	createFile(id: number, uploadedBy: number, messageId: number): Promise<File> {
		const file = {
			id: id,
			fileName: 'file1',
			fileSize: 100,
			fileType: 'image/png',
			content: 'content',
			messageId: messageId,
			uploadedBy: uploadedBy,
			uploadAt: new Date(),
		};
		return db('files')
			.insert(file)
			.then(() => db('files').where('id', id).first());
	}

	deleteFiles(id: number[]): Promise<void> {
		return db('files')
			.where((b) => b.whereIn('id', id))
			.del();
	}

	createInvite(
		id: number,
		senderId: number,
		inviteeId: number,
		workspaceId: number,
		status: 'pending' | 'accepted' | 'cancelled' = 'pending'
	): Promise<Invite> {
		const invite = {
			id: id,
			senderId: senderId,
			inviteeId: inviteeId,
			workspaceId: workspaceId,
			createdAt: new Date(),
			updatedAt: new Date(),
			expiresAt: new Date(),
			status: status,
		};
		return db('invites')
			.insert(invite)
			.then(() => db('invites').where('id', id).first());
	}

	deleteInvites(id: number[]): Promise<void> {
		return db('invites')
			.where((b) => b.whereIn('id', id))
			.del();
	}

	createNotification(
		id: number,
		userId: number,
		messageId: number,
		type: 'mention' | 'newMessage' | 'invite',
		isRead: boolean = false
	): Promise<Notification> {
		const notification = {
			id: id,
			recipientId: userId,
			messageId: messageId,
			type: type,
			isRead: isRead,
			createdAt: new Date(),
		};
		return db('notifications')
			.insert(notification)
			.then(() => db('notifications').where('id', id).first());
	}

	deleteNotifications(id: number[]): Promise<void> {
		return db('notifications')
			.where((b) => b.whereIn('id', id))
			.del();
	}

	createThread(participantId: number, parentMessageId: number): Promise<Thread> {
		const thread = {
			participantId: participantId,
			parentMessageId: parentMessageId,
		};
		return db('threads')
			.insert(thread)
			.then(() => db('threads').where('participantId', participantId).first());
	}

	deleteThread(participantId: number, parentMessageId: number): Promise<void> {
		return db('threads').where('participantId', participantId).andWhere('parentMessageId', parentMessageId).del();
	}
}

export default new EntityFactory();
