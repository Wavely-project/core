import { Knex } from 'knex';

import { CreateUserDto, UpdateUserDto, User } from '@/api/user/userModel';

export const userRepository = {
	create: async (
		user: CreateUserDto,
		trx: Knex.Transaction
	): Promise<User> => {
		const ids = await trx.insert(user).into('users');
		return trx.select('*').from('users').where('id', ids[0]).first();
	},
	getById: (id: number, trx: Knex.Transaction): Promise<User | null> => {
		return trx.select('*').from('users').where('id', id).first();
	},
	getByEmail: (
		email: string,
		trx: Knex.Transaction
	): Promise<User | null> => {
		return trx.select('*').from('users').where('email', email).first();
	},
	getByUsername: (
		username: string,
		trx: Knex.Transaction
	): Promise<User | null> => {
		return trx
			.select('*')
			.from('users')
			.where('username', username)
			.first();
	},
	update: (
		id: number,
		user: UpdateUserDto,
		trx: Knex.Transaction
	): Promise<User | null> => {
		return trx('users').where('id', id).update(user);
	},
	delete: (id: number, trx: Knex.Transaction): Promise<number> => {
		return trx('users').where('id', id).del();
	},
};
