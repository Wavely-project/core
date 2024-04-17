import { SocketClient, SocketServer } from './sockets.types';

export default function roomsEvents(io: SocketServer, socket: SocketClient) {
	socket.on('openChannel', (channelId: string) => {
		socket.join(channelId);
	});
	socket.on('closeChannel', (channelId: string) => {
		socket.leave(channelId);
	});
	socket.on('openWorkspace', (workspaceId: string) => {
		socket.join(workspaceId);
	});
	socket.on('closeWorkspace', (workspaceId: string) => {
		socket.leave(workspaceId);
	});
}
