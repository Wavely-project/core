import { Request, Response } from 'express';

import { handleServiceResponse } from '../../common/utils/httpHandlers';
import { UpdateUserDto } from './userModel';
import { userService } from './userService';

const UserController = {
	getById: async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		res.json({ id });
		// const serviceResponse = await userService.findById(id);
		// handleServiceResponse(serviceResponse, res);
	},
	updateUser: async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		res.json({ id });
		// const serviceResponse = await userService.updateUser(id, req.body);
		// handleServiceResponse(serviceResponse, res);
	},
	deleteUser: async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		res.json({ id });
		// const serviceResponse = await userService.deleteUser(id);
		// handleServiceResponse(serviceResponse, res);
	},
	update: async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		const { name, email, bio, avatarUrl, status } = req.body;
		const updateUserDto: UpdateUserDto = { id, name, email, bio, avatarUrl, status };
		console.log(updateUserDto);
		res.status(200).json({ message: 'User updated successfully' });
	},
	delete: async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		console.log(id);
		res.status(200).json({ message: 'User deleted successfully' });
	},
};

export default UserController;
