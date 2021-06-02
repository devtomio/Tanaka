const Redis = require('ioredis');

module.exports = class RedisClient {
	constructor(client) {
		this.db = new Redis({
			enableReadyCheck: true,
			db: 0,
		});

		this.start();

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
