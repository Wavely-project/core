import { z } from 'zod';

export const messageResponse = z.object({
	message: z.string(),
});

export const paginateResponse = (objs: any) => {
	return z.object({
		objs,
		hasNext: z.boolean(),
		cursor: z.number(),
	});
};
