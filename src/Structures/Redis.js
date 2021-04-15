const { REDISHOST, REDISPASSWORD, REDISPORT, REDISUSER } = process.env;
const Redis = require('ioredis');

module.exports = class RedisClient {
	constructor(client) {
		this.db = new Redis({
			port: REDISPORT,
			host: REDISHOST,
			password: REDISPASSWORD,
			username: REDISUSER,
			enableReadyCheck: true,
			db: 0,
		});

		Object.defineProperty(this, 'client', { value: client });
	}

	start() {
		this.db
			.on('connect', () => this.client.logger.info('[REDIS]: Connecting...'))
			.on('ready', () => this.client.logger.info('[REDIS]: Ready!'))
			.on('error', (error) => this.client.logger.error(`[REDIS]: ${error}`))
			.on('reconnecting', () => this.client.logger.warn('[REDIS]: Reconnecting...'));
	}
};
