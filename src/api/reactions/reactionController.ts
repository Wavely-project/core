import { Request, Response } from 'express';

const ReactionController = {
	getMessageReactions: async (req: Request, res: Response) => {
		const messageId = parseInt(req.params.id);
		res.json({ messageId });
	},
};

export default ReactionController;
