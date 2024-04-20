import { Coworker } from '@/api/coworkers/coworkersModel';
import { Member } from '@/api/members/memberModel';
import { Notification } from '@/api/notifications/notificationsModel';
import { Workspace } from '@/api/workspace/workspaceModel';

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
	createMember(userId: number, channelId: number): Promise<Member> {
		const member = {
			userId: userId,
			channelId: channelId,
			createdAt: new Date(),
		};
		return db('members')
			.insert(member)
			.then(() => db('members').where('userId', userId).first());
	}
	deleteMembers(userId: number, channelId: number): Promise<void> {
		return db('members')
			.where((b) => b.where('userId', userId))
			.andWhere('channelId', channelId)
			.del();
	}
	createCoworker(userId: number, workspaceId: number): Promise<Coworker> {
		const coworker = {
			userId: userId,
			workspaceId: workspaceId,
			createdAt: new Date(),
		};
		return db('coworkers')
			.insert(coworker)
			.then(() => db('coworkers').where('userId', userId).andWhere('workspaceId', workspaceId).first());
	}
	async deleteCoworkers(userId: number, workspaceId: number): Promise<void> {
		return await db('coworkers')
			.where((b) => b.where('userId', userId))
			.andWhere('workspaceId', workspaceId)
			.del();
	}
	async createWorkspace(
		id: number,
		ownerId: number,
		name: string,
		description: string,

		avatarUrl: string
	): Promise<Workspace> {
		const workspace = {
			id: id,
			name: name,
			description: description,
			ownerId: ownerId,
			avatarUrl: avatarUrl,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		return await db('workspaces')
			.insert(workspace)
			.then(() => db('workspaces').where('id', id).first());
	}
	async deleteWorkspaces(id: number[]): Promise<void> {
		return await db('workspaces')
			.where((b) => b.whereIn('id', id))
			.del();
	}
	async addReaction(id: number, userId: number, messageId: number, emoji: string): Promise<void> {
		const reaction = {
			id: id,
			messageId: messageId,
			userId: userId,
			reaction: emoji,
		};
		return await db('reactions')
			.insert(reaction)
			.then(() => db('reactions').where('id', id).first());
	}
	async deleteReactions(id: number[]): Promise<void> {
		return await db('reactions')
			.where((b) => b.whereIn('id', id))
			.del();
	}
	createMessage(
		id: number,
		senderId: number,
		channelId: number,
		workspaceId: number,
		parentMessageId: number,
		content: string
	): Promise<void> {
		const message = {
			id: id,
			senderId: senderId,
			channelId: channelId,
			workspaceId: workspaceId,
			parentMessageId: parentMessageId,
			content: content,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		return db('messages')
			.insert(message)
			.then(() => db('messages').where('id', id).first());
	}
	deleteMessages(id: number[]): Promise<void> {
		return db('messages')
			.where((b) => b.whereIn('id', id))
			.del();
	}
	createChannel(
		trx: any,
		id: number,
		creatorId: number,
		workspaceId: number,
		name: string,
		description: string,
		type: string
	): Promise<void> {
		const channel = {
			id: id,
			creatorId: creatorId,
			workspaceId: workspaceId,
			name: name,
			description: description,
			type: type,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		return trx('channels')
			.insert(channel)
			.then(() => db('channels').where('id', id).first());
	}
	async deleteChannels(id: number[]): Promise<void> {
		return await db('channels')
			.where((b) => b.whereIn('id', id))
			.del();
	}
}

export default new EntityFactory();
