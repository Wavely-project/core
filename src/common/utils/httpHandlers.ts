import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodSchema } from 'zod';

import userService from '../../api/user/userService';

type AsyncFunction = (
	req: Request,
	res: Response,
	next: NextFunction
) => Promise<void>;

export const asyncHandler = (fn: AsyncFunction) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await fn(req, res, next);
		} catch (err) {
			next(err);
		}
	};
};

export const handleServiceResponse = (
	response: Response,
	data: any,
	message: any,
	status: StatusCodes = StatusCodes.OK
) => {
	if (!response.trx.isCompleted()) response.trx.commit();
	return response.status(status).json({ message: message, data: data });
};

export const validateRequest =
	(schema: ZodSchema) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			const validatedReq = schema.parse({
				body: req.body,
				query: req.query,
				params: req.params,
			});
			req.body = validatedReq.body;
			req.query = validatedReq.query;
			req.params = validatedReq.params;
			next();
		} catch (err) {
			handleServiceResponse(
				res,
				{ err },
				'validation Error',
				StatusCodes.BAD_REQUEST
			);
		}
	};

export enum RESOURCES {
	USER,
	WORKSPACE,
	CHANNEL,
	MESSAGE,
	INVITE,
	NOTIFICATION,
	REACTION,
}
export const checkIdExists = (idString: string, resource: RESOURCES) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const id = parseInt(req.params[idString]);
		if (isNaN(id)) {
			handleServiceResponse(
				res,
				{ err: 'Invalid Id' },
				'Id should be a number',
				StatusCodes.BAD_REQUEST
			);
		}

		let notFound = false;
		switch (resource) {
			case RESOURCES.USER:
				if (!(await userService.getById(id, res.trx))) {
					notFound = true;
				}
				break;
			// TODO: Add more cases for other resources as needed
		}

		if (notFound) {
			handleServiceResponse(
				res,
				{ err: 'Not found' },
				'Resource not found',
				StatusCodes.NOT_FOUND
			);
		}
		next();
	};
};
