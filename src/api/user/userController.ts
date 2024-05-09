import { Request, Response } from 'express';

import { UpdateUserDto } from './userModel';

const UserController = {
	getById: async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		res.json({ id });
	},
	updateUser: async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		res.json({ id });
	},
	deleteUser: async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		res.json({ id });
	},
	update: async (req: Request, res: Response) => {
		const { name, email, bio, password } = req.body;
		const updateUserDto: UpdateUserDto = { name, email, bio, password };
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
