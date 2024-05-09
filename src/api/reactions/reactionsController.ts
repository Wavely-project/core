import { Request, Response } from 'express';

const reactionsController = {
	add: async (req: Request, res: Response) => {
		const { userId, messageId, reaction } = req.body;
		const addReactionDto = {
			userId,
			messageId,
			reaction,
		};

		console.log(addReactionDto);
		res.send(200).json(addReactionDto);
	},
	delete: async (req: Request, res: Response) => {
		const { userId, messageId, reaction } = req.body;
		const deleteReactionDto = {
			userId,
			messageId,
			reaction,
		};

		console.log(deleteReactionDto);
		res.send(200).json(deleteReactionDto);
	},
};

export default reactionsController;
