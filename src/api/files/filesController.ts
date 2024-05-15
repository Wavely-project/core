import { Request, Response } from 'express';

const filesController = {
	create: (req: Request, res: Response) => {
		const {
			fileName,
			fileSize,
			fileType,
			content,
			messageId,
			uploadedBy,
			uploadAt,
		} = req.body;
		const createFileDto = {
			fileName,
			fileSize,
			fileType,
			content,
			messageId,
			uploadedBy,
			uploadAt,
		};
		console.log(createFileDto);

		res.status(201).send(createFileDto);
	},
	getById: (req: Request, res: Response) => {
		const id = parseInt(req.params.id);
		console.log(id);

		res.status(200).send({ id });
	},
};

export default filesController;
