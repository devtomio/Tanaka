const { init, captureException } = require('@sentry/node');
const { ShardingManager } = require('kurasuta');
const Client = require('./Structures/Client');
const logger = require('./Structures/Logger');
const { join } = require('path');

const manager = new ShardingManager(join(__dirname, 'Structures', 'BaseCluster'), {
	token: process.env.BOT_TOKEN,
	client: Client,
	shardCount: 2,
	timeout: 60000,
});

init({
	dsn: process.env.SENTRY_URL,
	tracesSampleRate: 1.0,
	maxBreadcrumbs: 30,
	release: require('../package.json').version,
});

manager.on('debug', logger.debug);
manager.on('message', logger.debug);

manager.spawn()
	.then(() => logger.info(`Spawning shard. Shard count: ${manager.shardCount}`))
	.catch((reason) => {
		logger.error(`Spawing error: REASON = ${reason}`);
		captureException(reason);
	});
