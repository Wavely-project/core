import { Server, Socket } from 'socket.io';

import { User } from '../api/user/userModel';

// server to client
export interface S2C {
	emitHi: (greeting: string) => void;
}

// client to server
export interface C2S {
	hi: (name: string) => void;
}

export interface data {
	user: User;
}

export type ServerEvents = object;

export type SocketClient = Socket<C2S, S2C, ServerEvents, data>;
export type SocketServer = Server<C2S, S2C, ServerEvents, data>;
