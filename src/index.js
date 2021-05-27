const { ShardingManager } = require('kurasuta');
const Client = require('./Structures/Client');
const logger = require('./Structures/Logger');
const { join } = require('path');

const manager = new ShardingManager(join(__dirname, 'Structures', 'BaseCluster'), {
	token: process.env.DISCORD_TOKEN,
	client: Client,
	shardCount: 2,
	timeout: 60000,
});

manager.on('debug', logger.debug);
manager.on('message', logger.debug);

manager.spawn()
	.then(() => logger.info(`Spawning shard. Shard count: ${manager.shardCount}`))
	.catch((reason) => logger.error(`Spawing error: REASON = ${reason}`));
