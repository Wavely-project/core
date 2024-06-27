import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

export const BaseFileSchema = z.object({
	fileName: z.string(),
	fileSize: z.number(),
	fileType: z.string(),
	content: z.string(),
	messageId: z.number(),
	uploadedBy: z.number(),
	uploadAt: z.date(),
});

export const FileSchema = BaseFileSchema.extend({
	id: z.number(),
	uploadedAt: z.date(),
});
export type File = z.infer<typeof FileSchema>;

export const CreateFileSchema = z.object({
	body: BaseFileSchema,
});

export type CreateFileDto = z.infer<typeof CreateFileSchema.shape.body>;

export const GetFileSchema = z.object({
	params: z.object({ id: commonValidations.id }),
});
