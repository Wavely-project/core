import { CreateFileDto, File } from './filesModel';
const filesRepository = {
	createFile: async (trx: any, file: CreateFileDto): Promise<File> => {
		const ids = await trx('files').insert(file);
		const newFile = await trx('files').where('id', ids[0]).first();
		return newFile;
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
		await trx('files').where('id', id).del();
	},
};

export default filesRepository;
