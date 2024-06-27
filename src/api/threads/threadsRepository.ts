import { CreateThreadDto, Thread } from './threadsModel';

const threadsRepository = {
	createThread: async (
		thread: CreateThreadDto,
		trx: any
	): Promise<Thread> => {
		const ids = await trx.insert(thread).into('threads');
		return trx
			.select('*')
			.from('threads')
			.where('participantId', ids[0])
			.first();
	},
	getWorkspaceThreads: (
		participantId: number,
		trx: any
	): Promise<Thread[] | null> => {
		return trx
			.select('*')
			.from('threads')
			.where('participantId', participantId);
	},
	deleteThread: (
		participantId: number,
		messageId: number,
		trx: any
	): Promise<void> => {
		return trx
			.delete()
			.from('threads')
			.where('participantId', participantId)
			.andWhere('parentMessageId', messageId);
	},
};

export default threadsRepository;
