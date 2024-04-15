import { authorize } from '@thream/socketio-jwt';

import { User } from '../api/user/userModel';
import { userService } from '../api/user/userService';
import { env } from '../common/utils/envConfig';
import { SocketClient, SocketServer } from './sockets.types';

// refer to https://socket.io/docs/v4/server-application-structure#each-file-registers-its-own-event-handlers
// to know more about the structure of this files.

// also refer to https://socket.io/docs/v4/typescript/#types-for-the-server
// to know more about the types used in this file, and how to define them.

export function listeners(io: SocketServer, socket: SocketClient) {
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

	// this is a middleware.
	io.use((socket, next) => {
		console.log('user object in another middleware: ', socket.user);
		console.log('socket id: ', socket.id);
		next();
	});

	// correct since it's defined
	socket.on('hi', (name) => {
		console.log('user22: ', socket.data.user);
		console.log('Received hi:', name);
		socket.emit('emitHi', `hi ${name}!`);
	});

	// incorrect since it's not defined
	// socket.on('bye', (x) => {});
	// socket.on('hi', (x, y) => {});

	// also incorrect emitting an event that is not defined
	// socket.emit('emitBye', 'bye');
}
