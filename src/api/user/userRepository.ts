import { CreateUserDto, UpdateUser, User } from '@/api/user/userModel';

import db from '../../../db/db';

export const userRepository = {
	createUser: async (user: CreateUserDto): Promise<User> => {
		const ids = await db('users').insert(user);
		const newUser = await db('users').where('id', ids[0]).first();
		return newUser;
	},

	findAll: async (): Promise<User[]> => {
		return await db.select('*').from('users');
	},

	findById: async (id: number): Promise<User | null> => {
		return await db.select('*').from('users').where('id', id).first();
	},

	findByEmail: async (email: string): Promise<User | null> => {
		return await db.select('*').from('users').where('email', email).first();
	},

	findByUsername: async (username: string): Promise<User | null> => {
		return await db.select('*').from('users').where('username', username).first();
	},
	updateUser: async (id: number, user: UpdateUser): Promise<User> => {
		await db('users').where('id', id).update(user);
		const updatedUser = await db('users').where('id', id).first();
		return updatedUser;
	},
	deleteUser: async (id: number): Promise<null> => {
		return await db('users').where('id', id).delete();
	},
};
