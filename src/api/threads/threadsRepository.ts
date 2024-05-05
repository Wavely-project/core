import db from 'db/db';

import { CreateThreadDto, Thread } from './threadsModel';

const threadsRepository = {
	createThread: async (trx: any, thread: CreateThreadDto): Promise<Thread> => {
		trx = trx ? trx : db;
		//i want to check if the thread already exists with the same parentMessageId and participantId then return that thread
		const existingThread = await trx
			.select('*')
			.from('threads')
			.where('participantId', thread.participantId)
			.andWhere('parentMessageId', thread.parentMessageId)
			.first();
		if (existingThread) {
			return existingThread;
		}
		const ids = await trx.insert(thread).into('threads');
		return await trx
			.select('*')
			.from('threads')
			.where('participantId', ids[0])
			.andWhere('parentMessageId', thread.parentMessageId)
			.first();
	},
	getUserThreads: async (trx: any, participantId: number): Promise<Thread[] | null> => {
		trx = trx ? trx : trx;
		return await trx.select('*').from('threads').where('participantId', participantId);
	},
	deleteThread: async (trx: any, participantId: number, messageId: number): Promise<void> => {
		trx = trx ? trx : trx;
		return await trx
			.delete()
			.from('threads')
			.where('participantId', participantId)
			.andWhere('parentMessageId', messageId);
	},
};

export default threadsRepository;
