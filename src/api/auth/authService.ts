import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { Knex } from 'knex';

import { CustomError } from '@/common/middleware/errorHandler';

import { env } from '../../common/utils/envConfig';
import { CreateUser } from '../user/userModel';
import { User } from '../user/userModel';
import userService from '../user/userService';

const authService = {
	signup: async (payload: CreateUser, trx: Knex.Transaction) => {
		console.log(await userService.getByEmail(payload.email, trx));
		if (await userService.checkEmailExists(payload.email, trx)) {
			throw new CustomError('Email already exists', StatusCodes.CONFLICT);
		}

		if (await userService.usernameExists(payload.username, trx)) {
			throw new CustomError(
				'Username already exists',
				StatusCodes.CONFLICT
			);
		}

		return await userService.createUser(payload, trx);
	},
	login: async (
		email: string,
		password: string,
		trx: Knex.Transaction
	): Promise<{ user: User; token: string }> => {
		const user = await userService.getByEmail(email, trx);
		if (!user) {
			throw new CustomError("Email doesn't exists", StatusCodes.CONFLICT);
		}

		if (user.password !== password) {
			throw new CustomError('Wrong password.', StatusCodes.CONFLICT);
		}

		delete user?.password;
		delete user?.bio;
		delete user?.avatarUrl;
		delete user?.status;

		const token = jwt.sign(user, env.JWT_SECRET, {
			expiresIn: 99999,
		});
		return {
			token: token,
			user: user,
		};
	},
	authenticate: (
		header: string,
		trx: Knex.Transaction
	): Promise<User | null> => {
		const token = header.split(' ')[1];
		if (!token) {
			throw new CustomError('Unauthorized', StatusCodes.UNAUTHORIZED);
		}
		const result = jwt.verify(token, 'secret');
		if (!result) {
			throw new CustomError('Unauthorized', StatusCodes.UNAUTHORIZED);
		}

		return userService.getById((result as User).id, trx);
	},
};

export default authService;
