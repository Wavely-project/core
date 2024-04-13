import db from '../../../db/db';
import { CreateFileDto, File } from './filesModel';
const filesRepository = {
	createFile: async (file: CreateFileDto): Promise<File> => {
		const ids = await db('files').insert(file);
		const newFile = await db('files').where('id', ids[0]).first();
		return newFile;
	},
	getFileById: async (id: number): Promise<File | null> => {
		return await db.select('*').from('files').where('id', id).first();
	},
	getFilesByMessageId: async (messageId: number): Promise<File[]> => {
		return await db.select('*').from('files').where('messageId', messageId);
	},
	getUserFiles: async (userId: number): Promise<File[]> => {
		return await db.select('*').from('files').where('uploadedBy', userId);
	},
	deleteFile: async (id: number): Promise<void> => {
		await db('files').where('id', id).del();
	},
};

export default filesRepository;
