import { StatusCodes } from 'http-status-codes';

import { CreateUser, CreateUserDto, UpdateUser, User } from '@/api/user/userModel';
import { userRepository } from '@/api/user/userRepository';
import { InternalServiceResponse, ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

export const userService = {
	createUser: async (user: CreateUser): Promise<InternalServiceResponse<User | null>> => {
		try {
			const userPayload: CreateUserDto = {
				...user,
				bio: '',
				avatarUrl: '',
				status: 'offline',
			};
			const newUser = await userRepository.createUser(userPayload);
			if (!newUser) {
				return new InternalServiceResponse(ResponseStatus.Failed, null);
			}
			return new InternalServiceResponse<User>(ResponseStatus.Success, newUser);
		} catch (ex) {
			const errorMessage = `Error creating user: ${(ex as Error).message}`;
			logger.error(errorMessage);
			return new InternalServiceResponse(ResponseStatus.Failed, null);
		}
	},

	checkEmailExists: async (email: string): Promise<InternalServiceResponse<boolean>> => {
		try {
			const user = await userRepository.findByEmail(email);
			if (!user) {
				return new InternalServiceResponse<boolean>(ResponseStatus.Failed, false);
			}
			return new InternalServiceResponse<boolean>(ResponseStatus.Success, true);
		} catch (ex) {
			const errorMessage = `Error checking if email exists: ${(ex as Error).message}`;
			logger.error(errorMessage);
			return new InternalServiceResponse(ResponseStatus.Failed, false);
		}
	},

	usernameExists: async (username: string): Promise<InternalServiceResponse<boolean>> => {
		try {
			const user = await userRepository.findByUsername(username);
			if (!user) {
				return new InternalServiceResponse<boolean>(ResponseStatus.Failed, false);
			}
			return new InternalServiceResponse<boolean>(ResponseStatus.Success, true);
		} catch (ex) {
			const errorMessage = `Error checking if username exists: ${(ex as Error).message}`;
			logger.error(errorMessage);
			return new InternalServiceResponse(ResponseStatus.Failed, false);
		}
	},

	// Retrieves all users from the database
	findAll: async (): Promise<ServiceResponse<User[] | null>> => {
		try {
			const users = await userRepository.findAll();
			if (!users) {
				return new ServiceResponse(ResponseStatus.Failed, 'No Users found', null, StatusCodes.NOT_FOUND);
			}
			return new ServiceResponse<User[]>(ResponseStatus.Success, 'Users found', users, StatusCodes.OK);
		} catch (ex) {
			const errorMessage = `Error finding all users: $${(ex as Error).message}`;
			logger.error(errorMessage);
			return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	},

	// Retrieves a single user by their ID
	findById: async (id: number): Promise<ServiceResponse<User | null>> => {
		try {
			const user = await userRepository.findById(id);
			if (!user) {
				return new ServiceResponse(ResponseStatus.Failed, 'User not found', null, StatusCodes.NOT_FOUND);
			}
			return new ServiceResponse<User>(ResponseStatus.Success, 'User found', user, StatusCodes.OK);
		} catch (ex) {
			const errorMessage = `Error finding user with id ${id}:, ${(ex as Error).message}`;
			logger.error(errorMessage);
			return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	},

	findByEmail: async (email: string): Promise<InternalServiceResponse<User | null>> => {
		try {
			const user = await userRepository.findByEmail(email);
			if (!user) {
				return new InternalServiceResponse(ResponseStatus.Failed, null);
			}
			return new InternalServiceResponse<User>(ResponseStatus.Success, user);
		} catch (ex) {
			const errorMessage = `Error finding user with email ${email}: ${(ex as Error).message}`;
			logger.error(errorMessage);
			return new InternalServiceResponse(ResponseStatus.Failed, null);
		}
	},
	updateUser: async (id: number, user: UpdateUser): Promise<ServiceResponse<User | null>> => {
		try {
			const updatedUser = await userRepository.updateUser(id, user);
			if (!updatedUser) {
				return new ServiceResponse(ResponseStatus.Failed, 'User not found', null, StatusCodes.NOT_FOUND);
			}
			return new ServiceResponse<User>(ResponseStatus.Success, 'User updated', updatedUser, StatusCodes.OK);
		} catch (ex) {
			const errorMessage = `Error updating user with id ${id}: ${(ex as Error).message}`;
			logger.error(errorMessage);
			return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	},
	deleteUser: async (id: number): Promise<ServiceResponse<User | null>> => {
		try {
			await userRepository.deleteUser(id);
			return new ServiceResponse<User>(ResponseStatus.Success, 'User deleted', null, StatusCodes.OK);
		} catch (ex) {
			const errorMessage = `Error deleting user with id ${id}: ${(ex as Error).message}`;
			logger.error(errorMessage);
			return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	},
};
