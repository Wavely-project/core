import db from 'db/db';
import { NextFunction, Request, Response } from 'express';

export default async (_req: Request, res: Response, next: NextFunction) => {
	res.trx = await db.transaction();
	next();
};
