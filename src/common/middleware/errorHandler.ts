import {
	ErrorRequestHandler,
	NextFunction,
	Request,
	RequestHandler,
	Response,
} from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

import { handleServiceResponse } from '../utils/httpHandlers';

export class CustomError extends Error {
	constructor(
		public message: string,
		public statusCode: StatusCodes,
		public customProperty?: any
	) {
		super(message);
		this.statusCode = statusCode;
		this.customProperty = customProperty;
	}
}

const unexpectedRequest: RequestHandler = (_req, res) => {
	res.sendStatus(StatusCodes.NOT_FOUND);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const addErrorToRequestLog: ErrorRequestHandler = (
	err,
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	res.trx.rollback();
	if (err instanceof CustomError) {
		handleServiceResponse(
			res,
			{ err: err.customProperty },
			err.message,
			err.statusCode
		);
		return;
	}
	handleServiceResponse(
		res,
		{
			status: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
			err: err,
		},
		StatusCodes.INTERNAL_SERVER_ERROR
	);
	next(err);
};

export default () => [unexpectedRequest, addErrorToRequestLog];
