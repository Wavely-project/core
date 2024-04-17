import { createServer } from 'http';
import { type AddressInfo } from 'net';
import { io as ioc, type Socket as ClientSocket } from 'socket.io-client';

import { app } from '../../server';
import { connectSocket } from '../socket';
import { C2S, S2C, SocketClient as ServerSocket, SocketServer as Server } from '../sockets.types';

export function initSocket() {
	return new Promise<{ io: Server; serverSocket: ServerSocket; clientSocket: ClientSocket }>((done) => {
		let serverSocket: ServerSocket, clientSocket: ClientSocket<S2C, C2S>;

		const httpServer = createServer(app);
		const io = connectSocket(httpServer);

		httpServer.listen(() => {
			const port = (httpServer.address() as AddressInfo).port;
			clientSocket = ioc(`http://localhost:${port}`);
			io.on('connection', (socket) => {
				serverSocket = socket;
			});
			clientSocket.on('connect', () => {
				done({ io, serverSocket, clientSocket });
			});
		});
	});
}

export function closeSocket(io: Server, clientSocket: ClientSocket) {
	io.close();
	clientSocket.close();
}
