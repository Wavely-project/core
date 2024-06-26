import {
	OpenApiGeneratorV3,
	OpenAPIRegistry,
} from '@asteasolutions/zod-to-openapi';

import { channelRegistery } from '@/api/channels/channelApi';
import { filesRegistry } from '@/api/files/filesRoutes';
import { healthCheckRegistry } from '@/api/healthCheck/healthCheckRouter';
import { messageRegistery } from '@/api/messages/messageApi';
import { notificationsRegistry } from '@/api/notifications/notificationsRoutes';
import { reactionsRegistry } from '@/api/reactions/reactionsRouter';
import { userRegistry } from '@/api/user/userApi';
import { workspaceRegistry } from '@/api/workspace/workspaceApi';

import { authRegistry } from '../api/auth/authApi';

export function generateOpenAPIDocument() {
	const registry = new OpenAPIRegistry([
		healthCheckRegistry,
		authRegistry,
		userRegistry,
		workspaceRegistry,
		channelRegistery,
		messageRegistery,
		userRegistry,
		authRegistry,
		filesRegistry,
		notificationsRegistry,
		reactionsRegistry,
	]);
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
