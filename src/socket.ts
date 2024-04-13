import { Server, Socket } from 'socket.io';

// refer to https://socket.io/docs/v4/server-application-structure#each-file-registers-its-own-event-handlers
export function listeners(io: Server, socket: Socket) {
	console.log('Socket connected:', socket.id);
	io.use((_, next) => {
		console.log('Socket middleware');
		next();
	});

	socket.on('hi', (data: any) => {
		console.log(`_______hi with ${data}`);
	});
}
