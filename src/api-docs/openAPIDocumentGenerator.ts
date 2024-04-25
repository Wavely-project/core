import { OpenApiGeneratorV3, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

// import { channelRegistery } from '@/api/channels/channelRouter';
import { healthCheckRegistry } from '@/api/healthCheck/healthCheckRouter';
import { userRegistry } from '@/api/user/userRouter';

// import { workspaceRegistry } from '@/api/workspace/workspaceRouter';
import { authRegistry } from '../api/auth/authRouter';
export function generateOpenAPIDocument() {
	const registry = new OpenAPIRegistry([healthCheckRegistry, userRegistry, authRegistry]);
	const generator = new OpenApiGeneratorV3(registry.definitions);

	return generator.generateDocument({
		openapi: '3.0.0',
		info: {
			version: '1.0.0',
			title: 'Swagger API',
		},
		externalDocs: {
			description: 'View the raw OpenAPI Specification in JSON format',
			url: '/swagger.json',
		},
	});
}
