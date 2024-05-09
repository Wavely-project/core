import { Coworker } from '@/api/coworkers/coworkersModel';
import { Member } from '@/api/members/memberModel';
import { Notification } from '@/api/notifications/notificationsModel';
import { Workspace } from '@/api/workspace/workspaceModel';

import db from '../../../db/db';
import { Invite } from '../../api/invites/invitesModel';
import { Thread } from '../../api/threads/threadsModel';
class EntityFactory {
	async createFile(id: number, uploadedBy: number, messageId: number): Promise<File> {
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
		return await db('files')
			.insert(file)
			.then(() => db('files').where('id', id).first());
	}

	async deleteFiles(id: number[]): Promise<void> {
		return await db('files')
			.where((b: any) => b.whereIn('id', id))
			.del();
	}

	async createInvite(
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
		return await db('invites')
			.insert(invite)
			.then(() => db('invites').where('id', id).first());
	}

	async deleteInvites(id: number[]): Promise<void> {
		return await db('invites')
			.where((b: any) => b.whereIn('id', id))
			.del();
	}

	async createNotification(
		id: number,
		recipientId: number,
		type: 'mention' | 'newMessage' | 'invite',
		isRead: boolean = false
	): Promise<Notification> {
		const notification = {
			id: id,
			recipientId: recipientId,
			// entityId: entityId,
			type: type,
			isRead: isRead,
			createdAt: new Date(),
		};
		return await db('notifications')
			.insert(notification)
			.then(() => db('notifications').where('id', id).first());
	}

	async deleteNotifications(id: number[]): Promise<void> {
		return await db('notifications')
			.where((b: any) => b.whereIn('id', id))
			.del();
	}

	async createThread(participantId: number, parentMessageId: number): Promise<Thread> {
		const thread = {
			participantId: participantId,
			parentMessageId: parentMessageId,
		};
		return await db('threads')
			.insert(thread)
			.then(() => db('threads').where('participantId', participantId).first());
	}

	async deleteThread(participantId: number, parentMessageId: number): Promise<void> {
		return await db('threads')
			.where('participantId', participantId)
			.andWhere('parentMessageId', parentMessageId)
			.del();
	}
	async createMember(userId: number, channelId: number): Promise<Member> {
		const member = {
			userId: userId,
			channelId: channelId,
			createdAt: new Date(),
		};
		return await db('members')
			.insert(member)
			.then(() => db('members').where('userId', userId).first());
	}
	async deleteMembers(userId: number, channelId: number): Promise<void> {
		return await db('members')
			.where((b: any) => b.where('userId', userId))
			.andWhere('channelId', channelId)
			.del();
	}
	async createCoworker(userId: number, workspaceId: number): Promise<Coworker> {
		const coworker = {
			userId: userId,
			workspaceId: workspaceId,
			createdAt: new Date(),
		};
		return await db('coworkers')
			.insert(coworker)
			.then(() => db('coworkers').where('userId', userId).andWhere('workspaceId', workspaceId).first());
	}
	async deleteCoworkers(userId: number, workspaceId: number): Promise<void> {
		return await db('coworkers')
			.where((b: any) => b.where('userId', userId))
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
			.where((b: any) => b.whereIn('id', id))
			.del();
	}
	async createReaction(id: number, userId: number, messageId: number, emoji: string): Promise<void> {
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
			.where((b: any) => b.whereIn('id', id))
			.del();
	}
	async createMessage(
		id: number,
		senderId: number,
		channelId: number,
		workspaceId: number,
		parentMessageId: number | null,
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
			.where((b: any) => b.whereIn('id', id))
			.del();
	}
	async createChannel(
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
		return await db('channels')
			.insert(channel)
			.then(() => db('channels').where('id', id).first());
	}
	async deleteChannels(id: number[]): Promise<void> {
		return await db('channels')
			.where((b: any) => b.whereIn('id', id))
			.del();
	}
	async createUser(id: number, username: string, email: string, name: string, password: string): Promise<void> {
		const user = {
			id: id,
			username: username,
			email: email,
			name: name,
			password: password,
			avatarUrl: '',
			status: 'online',
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		return await db('users')
			.insert(user)
			.then(() => db('users').where('id', id).first());
	}
	async deleteUsers(id: number[]): Promise<void> {
		return await db('users')
			.where((b: any) => b.whereIn('id', id))
			.del();
	}
}

export default new EntityFactory();
