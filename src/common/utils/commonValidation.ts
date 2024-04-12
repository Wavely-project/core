import { z } from 'zod';

export const commonValidations = {
	id: z
		.string()
		.refine((data) => !isNaN(Number(data)), 'ID must be a numeric value')
		.transform(Number)
		.refine((num) => num > 0, 'ID must be a positive number'),
	name: z.string().min(3),
	description: z.string().min(3),
	ownerId: z.number().positive(),
	avatarUrl: z.string().optional(),
	// ... other common validations
};
