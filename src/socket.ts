import { Server, Socket } from 'socket.io';

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
