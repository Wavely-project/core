import { StatusCodes } from 'http-status-codes';
import request from 'supertest';

import { ServiceResponse } from '@/common/models/serviceResponse';
import { app } from '@/server';

describe('Health Check API endpoints', () => {
	it('GET / - success', async () => {
		const response = await request(app).get('/health-check');
		const result: ServiceResponse = response.body;

		expect(response.statusCode).toEqual(StatusCodes.OK);
		expect(result.message).toEqual('Service is good');
	});
});
