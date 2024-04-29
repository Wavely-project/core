import { authorize } from '@thream/socketio-jwt';
import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';

import { User } from '../api/user/userModel';
import { userService } from '../api/user/userService';
import { env } from '../common/utils/envConfig';
import roomsEvents from './roomsEvents';
import { C2S, data, S2C, ServerEvents, SocketClient, SocketServer } from './sockets.types';

// refer to https://socket.io/docs/v4/server-application-structure#each-file-registers-its-own-event-handlers
// to know more about the structure of this files.

// also refer to https://socket.io/docs/v4/typescript/#types-for-the-server
// to know more about the types used in this file, and how to define them.

export function connectSocket(server: HttpServer) {
	const io = new Server<C2S, S2C, ServerEvents, data>(server, { cors: { origin: '*', methods: ['GET', 'POST'] } });
	if (env.NODE_ENV === 'development') {
		io.use(
			authorize({
				secret: env.JWT_SECRET,
				onAuthentication: async (user: User) => {
					const res = await userService.findById(user.id);
					if (!res) throw new Error('User not found');
					return res.responseObject;
				},
			})
		);
	}

	// this is an example middleware.
	io.use((socket, next) => {
		console.log('user object in another middleware: ', socket.user);
		console.log('socket id: ', socket.id);
		next();
	});

	// register all events here
	io.on('connection', (socket) => {
		eventsExample(io, socket);
		roomsEvents(io, socket);
	});

	global.io = io;
	return io;
}

function eventsExample(io: SocketServer, socket: SocketClient) {
	// correct since event defined
	socket.on('hi', (name) => {
		socket.emit('emitHi', `hi ${name}!`);
	});

	// incorrect since it's not defined
	// socket.on('bye', (x) => {});

	// incorrect since handler has different parameters
	// socket.on('hi', (x, y) => {});

	// also incorrect emitting an event that is not defined
	// socket.emit('emitBye', 'bye');
}
