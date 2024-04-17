import { createServer } from 'http';
import { type AddressInfo } from 'net';
// import { Server, type Socket as ServerSocket } from 'socket.io';
import { io as ioc, type Socket as ClientSocket } from 'socket.io-client';

import { app } from '../../server';
import { connectSocket } from '../socket';
import { SocketClient as ServerSocket, SocketServer as Server } from '../sockets.types';

describe('working socket', () => {
	let io: Server, serverSocket: ServerSocket, clientSocket: ClientSocket;

	beforeAll(() => {
		return new Promise((done) => {
			const httpServer = createServer(app);
			io = connectSocket(httpServer);
			httpServer.listen(() => {
				const port = (httpServer.address() as AddressInfo).port;
				clientSocket = ioc(`http://localhost:${port}`);
				io.on('connection', (socket) => {
					serverSocket = socket;
				});
				clientSocket.on('connect', done);
			});
		});
	});
	afterAll(() => {
		io.close();
		clientSocket.close();
	});

	// using resolvers
	test('hi event', async () => {
		return new Promise<void>((resolve) => {
			clientSocket.on('emitHi', (arg) => {
				expect(arg).toEqual('hi world!');
				resolve();
			});
			clientSocket.emit('hi', 'world');
		});
	});

	test('server emits hi event', async () => {
		return new Promise<void>((resolve) => {
			serverSocket.on('hi', (arg) => {
				expect(arg).toEqual('world');
				resolve();
			});
			clientSocket.emit('hi', 'world');
		});
	});
});
