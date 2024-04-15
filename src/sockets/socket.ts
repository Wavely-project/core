import { SocketClient, SocketServer } from './sockets.types';

// refer to https://socket.io/docs/v4/server-application-structure#each-file-registers-its-own-event-handlers
// to know more about the structure of this files.

// also refer to https://socket.io/docs/v4/typescript/#types-for-the-server
// to know more about the types used in this file, and how to define them.

export function listeners(io: SocketServer, socket: SocketClient) {
	console.log('Socket connected:', socket.id);
	io.use((_, next) => {
		next();
	});

	// correct since it's defined
	socket.on('hi', (name) => {
		console.log('Received hi:', name);
		socket.emit('emitHi', `hi ${name}!`);
	});

	// incorrect since it's not defined
	// socket.on('bye', (x) => {});
	// socket.on('hi', (x, y) => {});

	// also incorrect emitting an event that is not defined
	// socket.emit('emitBye', 'bye');
}
