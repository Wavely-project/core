import { Server, Socket } from 'socket.io';

import { Channel, DeleteChannelData } from '../api/channels/channelModel';
import { Coworker, CoworkerData } from '../api/coworkers/coworkersModel';
import { MemberData } from '../api/members/memberModel';
import { deleteMessageData, Message } from '../api/messages/messageModel';
import { Reaction } from '../api/reactions/reactionModel';
import { User } from '../api/user/userModel';
import { Workspace } from '../api/workspace/workspaceModel';

// server to client
export interface S2C {
	emitHi: (greeting: string) => void; // simple pings

	// Messages
	newMessage: (message: Message) => void;
	updateMessage: (message: Message) => void;
	deleteMessage: (message: deleteMessageData) => void;

	// channels
	addChannel: (channel: Channel) => void;
	updateChannel: (channel: Channel) => void;
	deleteChannel: (channel: DeleteChannelData) => void;

	// members
	addMember: (member: MemberData) => void;
	removeMember: (member: MemberData) => void;

	// reactions
	addReaction: (reaction: Reaction) => void;
	removeReaction: (reaction: Reaction) => void;

	// workspace
	addWorkspace: (workspace: Workspace) => void;
	updateWorkspace: (workspace: Workspace) => void;
	removeWorkspace: (workspaceId: number) => void;

	// coworkers
	addCoworker: (coworker: CoworkerData) => void;
	removeCoworker: (coworker: Coworker) => void;

	// user
	userUpdate: (user: User) => void;
	userDelete: (user: User) => void;
	typing: (user: User) => void;
	status: (userData: User) => void;

	// notifications
	addNotification: (notification: Notification) => void;
	removeNotification: (notificationId: number) => void;
}

// client to server
export interface C2S {
	connect: () => void;
	hi: (name: string) => void;

	// channels
	openChannel: (channelId: string) => void;
	closeChannel: (channelId: string) => void;

	// workspace
	openWorkspace: (workspaceId: string) => void;
	closeWorkspace: (workspaceId: string) => void;
}

export type data = object;
export type ServerEvents = object;

export type SocketClient = Socket<C2S, S2C, ServerEvents, data>;
export type SocketServer = Server<C2S, S2C, ServerEvents, data>;
