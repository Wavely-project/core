import { Server } from 'socket.io';

import { logger } from './server';

export function listeners(io: Server) {
	io.on('connection', (socket) => {
		logger.info(`Socket connected: ${socket.id}`);
	});

	io.on('connect_error', (err) => {
		logger.error(`Socket connection error: ${err}`);
	});

	io.use((socket) => {
		console.log(socket.handshake.auth);
	});
}
