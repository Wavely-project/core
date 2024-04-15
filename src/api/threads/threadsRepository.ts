import db from '../../../db/db';
import { CreateThreadDto, Thread } from './threadsModel';

const threadsRepository = {
	createThread: async (thread: CreateThreadDto): Promise<Thread> => {
		const ids = await db('threads').insert(thread);
		const newThread = await db('threads').where('participantId', ids[0]).first();
		return newThread;
	},
	getUserThreads: async (participantId: number): Promise<Thread[] | null> => {
		return await db.select('*').from('threads').where('participantId', participantId);
	},
	deleteThread: async (participantId: number, messageId: number): Promise<void> => {
		await db('threads').where('participantId', participantId).andWhere('parentMessageId', messageId).del();
	},
};

export default threadsRepository;
