import { Server } from 'socket.io';

import { C2S, data, S2C, ServerEvents } from './src/sockets/sockets.types';

declare global {
	// eslint-disable-next-line no-var
	var io: Server<C2S, S2C, ServerEvents, data>;
}

declare module 'express' {
	export interface Response {
		trx?: Transaction;
	}
}
