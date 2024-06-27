import { Knex } from 'knex';

import {
	CreateUser,
	CreateUserDto,
	UpdateUserDto,
	User,
} from '@/api/user/userModel';
import { userRepository } from '@/api/user/userRepository';

import coworkersService from '../coworkers/coworkersService';
import workspaceService from '../workspace/workspaceService';

const userService = {
	createUser: async (
		user: CreateUser,
		trx: Knex.Transaction
	): Promise<User> => {
		const userPayload: CreateUserDto = {
			...user,
			bio: '',
			avatarUrl: '',
			status: 'offline',
		};
		return userRepository.create(userPayload, trx);
	},
	checkEmailExists: async (
		email: string,
		trx: Knex.Transaction
	): Promise<boolean> => {
		return !!(await userRepository.getByEmail(email, trx));
	},
	usernameExists: async (
		username: string,
		trx: Knex.Transaction
	): Promise<boolean> => {
		return !!(await userRepository.getByUsername(username, trx));
	},
	getById: (id: number, trx: Knex.Transaction): Promise<User | null> => {
		return userRepository.getById(id, trx);
	},
	getByIds: (ids: number[], trx: Knex.Transaction): Promise<User[]> => {
		return userRepository.getByIds(ids, trx);
	},
	getByEmail: (
		email: string,
		trx: Knex.Transaction
	): Promise<User | null> => {
		return userRepository.getByEmail(email, trx);
	},
	getWorkspaces: async (userId: number, trx: Knex.Transaction) => {
		const ids = await coworkersService.getUserWorkspaces(userId, trx);
		return workspaceService.getByIds(ids, trx);
	},
	updateUser: (
		userId: number,
		user: UpdateUserDto,
		trx: Knex.Transaction
	): Promise<User | null> => {
		return userRepository.update(userId, user, trx);
	},
	deleteUser: (userId: number, trx: Knex.Transaction): Promise<number> => {
		return userRepository.delete(userId, trx);
	},
};

export default userService;
