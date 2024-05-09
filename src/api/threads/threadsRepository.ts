import { CreateThreadDto, Thread } from './threadsModel';

const threadsRepository = {
	createThread: async (trx: any, thread: CreateThreadDto): Promise<Thread> => {
		const ids = await trx.insert(thread).into('threads');
		return await trx.select('*').from('threads').where('participantId', ids[0]).first();
	},
	getUserThreads: async (trx: any, participantId: number): Promise<Thread[] | null> => {
		return await trx.select('*').from('threads').where('participantId', participantId);
	},
	deleteThread: async (trx: any, participantId: number, messageId: number): Promise<void> => {
		return await trx
			.delete()
			.from('threads')
			.where('participantId', participantId)
			.andWhere('parentMessageId', messageId);
	},
};

export default threadsRepository;
