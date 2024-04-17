import { type Socket as ClientSocket } from 'socket.io-client';

import { SocketClient as ServerSocket, SocketServer as Server } from '../sockets.types';
import { closeSocket, initSocket } from './setupSocketTesting';

describe('basic socket', () => {
	let io: Server, serverSocket: ServerSocket, clientSocket: ClientSocket;

	beforeAll(async () => {
		({ io, clientSocket, serverSocket } = await initSocket());
	});
	afterAll(() => {
		closeSocket(io, clientSocket);
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
