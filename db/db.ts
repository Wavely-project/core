import knex from 'knex';

import config from '../knexfile';
const env = process.env.NODE_ENV || 'development';
console.log('env: ', env);

export default knex(config.development);
