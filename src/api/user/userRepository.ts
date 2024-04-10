import { User } from '@/api/user/userModel';

import db from '../../../db/db';

export const userRepository = {
	findAllAsync: async (): Promise<User[]> => {
		return await db.select('*').from('users');
	},

	findByIdAsync: async (id: number): Promise<User | null> => {
		console.log('id: ', id);
		return await db.select('*').from('users').where('id', id).first();
	},
};
