import type { Knex } from 'knex';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
	development: {
		client: 'mysql2',
		connection: {
			host: '127.0.0.1',
			user: 'root',
			password: '123456',
			database: 'wavely',
		},
		pool: { min: 2, max: 10 },
		migrations: {
			tableName: 'knex_migrations',
			directory: './db/migrations',
		},
		seeds: {
			directory: './db/seeds',
		},
	},
};

export default config;
