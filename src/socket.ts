import { io, logger } from './server';

io.on('connection', (socket) => {
	logger.info(`Socket connected: ${socket.id}`);
});

io.on('connect_error', (err) => {
	logger.error(`Socket connection error: ${err}`);
});

io.use((socket) => {
	console.log(socket.handshake.auth);
});
