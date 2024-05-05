import { Request, Response } from 'express';

const UserController = {
	getUserById: async (req: Request, res: Response) => {
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
};

export default UserController;
