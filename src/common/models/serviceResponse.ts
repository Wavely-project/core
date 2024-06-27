import { z } from 'zod';

export enum ResponseStatus {
	Success,
	Failed,
}

export class ServiceResponse<T = null> {
	success: boolean;
	message: string;
	responseObject: T | null;
	statusCode: number;

	constructor(
		status: ResponseStatus,
		message: string,
		responseObject: T | null,
		statusCode: number
	) {
		this.success = status === ResponseStatus.Success;
		this.message = message;
		this.responseObject = responseObject;
		this.statusCode = statusCode;
	}
}

export class InternalServiceResponse<T = null> {
	success: boolean;
	responseObject: T;

	constructor(status: ResponseStatus, responseObject: T) {
		this.success = status === ResponseStatus.Success;
		this.responseObject = responseObject;
	}
}

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
	z.object({
		message: z.string(),
		data: dataSchema.optional(),
	});
