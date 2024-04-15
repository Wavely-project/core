import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import {
	ResponseStatus,
	ServiceResponse,
} from '../../common/models/serviceResponse';
import { logger } from '../../server';
import { CreateUser } from '../user/userModel';
import { User } from '../user/userModel';
import { userService } from '../user/userService';

const authService = {
	signup: async (payload: CreateUser) => {
		try {
			if ((await userService.checkEmailExists(payload.email)).success) {
				return new ServiceResponse(
					ResponseStatus.Failed,
					'Email already exists',
					null,
					StatusCodes.CONFLICT
				);
			}

			if ((await userService.usernameExists(payload.username)).success) {
				return new ServiceResponse(
					ResponseStatus.Failed,
					'Username already exists',
					null,
					StatusCodes.CONFLICT
				);
			}

			const user = await userService.createUser(payload);
			return new ServiceResponse(
				ResponseStatus.Success,
				'User created',
				user.responseObject,
				StatusCodes.CREATED
			);
		} catch (ex) {
			const errorMessage = `Error creating user: ${(ex as Error).message}`;
			logger.error(errorMessage);
			return new ServiceResponse(
				ResponseStatus.Failed,
				errorMessage,
				null,
				StatusCodes.INTERNAL_SERVER_ERROR
			);
		}
	},
	login: async (email: string, password: string) => {
		try {
			if (!(await userService.checkEmailExists(email)).success) {
				return new ServiceResponse(
					ResponseStatus.Failed,
					'Email does not exist',
					null,
					StatusCodes.NOT_FOUND
				);
			}

			const user = (await userService.findByEmail(email)).responseObject;
			if (!user) {
				return new ServiceResponse(
					ResponseStatus.Failed,
					'Error finding user',
					null,
					StatusCodes.INTERNAL_SERVER_ERROR
				);
			}

			if (user.password !== password) {
				return new ServiceResponse(
					ResponseStatus.Failed,
					'Invalid password',
					null,
					StatusCodes.UNAUTHORIZED
				);
			}

			delete user?.password;
			delete user?.bio;
			delete user?.avatarUrl;
			delete user?.status;

			const secret: string = 'secret';
			const token = jwt.sign(user, secret);
			return new ServiceResponse(
				ResponseStatus.Success,
				'Login successful',
				token,
				StatusCodes.OK
			);
		} catch (ex) {
			const errorMessage = `Error logging in: ${(ex as Error).message}`;
			logger.error(errorMessage);
			return new ServiceResponse(
				ResponseStatus.Failed,
				errorMessage,
				null,
				StatusCodes.INTERNAL_SERVER_ERROR
			);
		}
	},

	authenticate: async (
		header: string
	): Promise<ServiceResponse<User | null>> => {
		try {
			const token = header.split(' ')[1];
			const result = jwt.verify(token, 'secret');
			if (!result) {
				return new ServiceResponse(
					ResponseStatus.Failed,
					'Unauthorized',
					null,
					StatusCodes.UNAUTHORIZED
				);
			}

			const user = await userService.findById((result as User).id);
			if (!user) {
				return new ServiceResponse(
					ResponseStatus.Failed,
					'User not found',
					null,
					StatusCodes.NOT_FOUND
				);
			}

			return new ServiceResponse(
				ResponseStatus.Success,
				'Authorized',
				result as User,
				StatusCodes.OK
			);
		} catch (ex) {
			const errorMessage = `Error authenticating user: ${(ex as Error).message}`;
			logger.error(errorMessage);
			return new ServiceResponse(
				ResponseStatus.Failed,
				errorMessage,
				null,
				StatusCodes.INTERNAL_SERVER_ERROR
			);
		}
	},
};

export default authService;
