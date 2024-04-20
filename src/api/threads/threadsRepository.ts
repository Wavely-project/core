import db from '../../../db/db';
import { CreateThreadDto, Thread } from './threadsModel';

const threadsRepository = {
	createThread: async (trx: any, thread: CreateThreadDto): Promise<Thread> => {
		const ids = await trx('threads').insert(thread);
		const newThread = await trx('threads').where('participantId', ids[0]).first();
		return newThread;
	},
	getUserThreads: async (participantId: number): Promise<Thread[] | null> => {
		return await db.select('*').from('threads').where('participantId', participantId);
	},
	deleteThread: async (trx: any, participantId: number, messageId: number): Promise<void> => {
		await trx('threads').where('participantId', participantId).andWhere('parentMessageId', messageId).del();
	},
};

export default threadsRepository;
