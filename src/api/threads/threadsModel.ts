import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

const ThreadSchema = z.object({
	participantId: z.number(),
	parentMessageId: z.number(),
});

export type Thread = z.infer<typeof ThreadSchema>;
export const CreateThreadSchema = ThreadSchema;
export type CreateThreadDto = z.infer<typeof CreateThreadSchema>;
