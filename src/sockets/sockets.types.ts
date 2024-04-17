import { Server, Socket } from 'socket.io';

import { User } from '../api/user/userModel';

// server to client
export interface S2C {
	emitHi: (greeting: string) => void; // simple pings

	//TODO: update this when repository layer is implemented.

	// Messages
	newMessage: (message: string) => void;
	updateMessage: (message: string) => void;
	deleteMessage: (message: string) => void;

	// channels
	addChannel: (channel: string) => void;
	updateChannel: (channel: string) => void;
	deleteChannel: (channel: string) => void;

	// members
	addMember: (member: string) => void;
	removeMember: (member: string) => void;

	// reactions
	addReaction: (reaction: string) => void;
	removeReaction: (reaction: string) => void;

	// workspace
	addWorkspace: (workspace: string) => void;
	updateWorkspace: (workspace: string) => void;
	removeWorkspace: (workspace: string) => void;

	// coworkers
	addCoworker: (coworker: string) => void;
	removeCoworker: (coworker: string) => void;

	// user
	userUpdate: (user: User) => void;
	userDelete: (user: User) => void;
	typing: (user: User) => void;
	status: (message: string) => void;

	// notifications
	addNotification: (notification: string) => void;
	removeNotification: (notification: string) => void;
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
