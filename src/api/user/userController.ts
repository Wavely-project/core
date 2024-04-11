import { Request, Response } from 'express';

import { handleServiceResponse } from '../../common/utils/httpHandlers';
import { userService } from './userService';

const UserController = {
	getUserById: async (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		const serviceResponse = await userService.findById(id);
		handleServiceResponse(serviceResponse, res);
	},
};

export default UserController;
