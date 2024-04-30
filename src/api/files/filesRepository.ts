import { CreateFileDto, File } from './filesModel';
const filesRepository = {
	createFile: async (trx: any, file: CreateFileDto): Promise<File> => {
		//Question: we should create a new message in the database to once we create file?
		const ids = await trx.insert(file).into('files');
		return await trx.select('*').from('files').where('id', ids[0]).first();
	},
	getFileById: async (trx: any, id: number): Promise<File | null> => {
		return await trx.select('*').from('files').where('id', id).first();
	},
	getFilesByMessageId: async (trx: any, messageId: number): Promise<File[]> => {
		return await trx.select('*').from('files').where('messageId', messageId);
	},
	getUserFiles: async (trx: any, userId: number): Promise<File[]> => {
		return await trx.select('*').from('files').where('uploadedBy', userId);
	},
	deleteFile: async (trx: any, id: number): Promise<void> => {
		return await trx.delete().from('files').where('id', id);
	},
};

export default filesRepository;
