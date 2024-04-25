import { Coworker } from '@/api/coworkers/coworkersModel';
import { Member } from '@/api/members/memberModel';
import { Notification } from '@/api/notifications/notificationsModel';
import { Workspace } from '@/api/workspace/workspaceModel';

import { Invite } from '../../api/invites/invitesModel';
import { Thread } from '../../api/threads/threadsModel';
class EntityFactory {
	createFile(trx: any, id: number, uploadedBy: number, messageId: number): Promise<File> {
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
		return trx('files')
			.insert(file)
			.then(() => trx('files').where('id', id).first());
	}

	deleteFiles(trx: any, id: number[]): Promise<void> {
		return trx('files')
			.where((b: any) => b.whereIn('id', id))
			.del();
	}

	createInvite(
		trx: any,
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
		return trx('invites')
			.insert(invite)
			.then(() => trx('invites').where('id', id).first());
	}

	deleteInvites(trx: any, id: number[]): Promise<void> {
		return trx('invites')
			.where((b: any) => b.whereIn('id', id))
			.del();
	}

	createNotification(
		trx: any,
		id: number,
		recipientId: number,
		messageId: number,
		type: 'mention' | 'newMessage' | 'invite',
		isRead: boolean = false
	): Promise<Notification> {
		const notification = {
			id: id,
			recipientId: recipientId,
			messageId: messageId,
			type: type,
			isRead: isRead,
			createdAt: new Date(),
		};
		return trx('notifications')
			.insert(notification)
			.then(() => trx('notifications').where('id', id).first());
	}

	deleteNotifications(trx: any, id: number[]): Promise<void> {
		return trx('notifications')
			.where((b: any) => b.whereIn('id', id))
			.del();
	}

	createThread(trx: any, participantId: number, parentMessageId: number): Promise<Thread> {
		const thread = {
			participantId: participantId,
			parentMessageId: parentMessageId,
		};
		return trx('threads')
			.insert(thread)
			.then(() => trx('threads').where('participantId', participantId).first());
	}

	deleteThread(trx: any, participantId: number, parentMessageId: number): Promise<void> {
		return trx('threads').where('participantId', participantId).andWhere('parentMessageId', parentMessageId).del();
	}
	createMember(trx: any, userId: number, channelId: number): Promise<Member> {
		const member = {
			userId: userId,
			channelId: channelId,
			createdAt: new Date(),
		};
		return trx('members')
			.insert(member)
			.then(() => trx('members').where('userId', userId).first());
	}
	deleteMembers(trx: any, userId: number, channelId: number): Promise<void> {
		return trx('members')
			.where((b: any) => b.where('userId', userId))
			.andWhere('channelId', channelId)
			.del();
	}
	createCoworker(trx: any, userId: number, workspaceId: number): Promise<Coworker> {
		const coworker = {
			userId: userId,
			workspaceId: workspaceId,
			createdAt: new Date(),
		};
		return trx('coworkers')
			.insert(coworker)
			.then(() => trx('coworkers').where('userId', userId).andWhere('workspaceId', workspaceId).first());
	}
	async deleteCoworkers(trx: any, userId: number, workspaceId: number): Promise<void> {
		return await trx('coworkers')
			.where((b: any) => b.where('userId', userId))
			.andWhere('workspaceId', workspaceId)
			.del();
	}
	async createWorkspace(
		trx: any,
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
		return await trx('workspaces')
			.insert(workspace)
			.then(() => trx('workspaces').where('id', id).first());
	}
	async deleteWorkspaces(trx: any, id: number[]): Promise<void> {
		return await trx('workspaces')
			.where((b: any) => b.whereIn('id', id))
			.del();
	}
	async addReaction(trx: any, id: number, userId: number, messageId: number, emoji: string): Promise<void> {
		const reaction = {
			id: id,
			messageId: messageId,
			userId: userId,
			reaction: emoji,
		};
		return await trx('reactions')
			.insert(reaction)
			.then(() => trx('reactions').where('id', id).first());
	}
	async deleteReactions(trx: any, id: number[]): Promise<void> {
		return await trx('reactions')
			.where((b: any) => b.whereIn('id', id))
			.del();
	}
	createMessage(
		trx: any,
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
		return trx('messages')
			.insert(message)
			.then(() => trx('messages').where('id', id).first());
	}
	deleteMessages(trx: any, id: number[]): Promise<void> {
		return trx('messages')
			.where((b: any) => b.whereIn('id', id))
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
			.then(() => trx('channels').where('id', id).first());
	}
	async deleteChannels(trx: any, id: number[]): Promise<void> {
		return await trx('channels')
			.where((b: any) => b.whereIn('id', id))
			.del();
	}
}

export default new EntityFactory();
