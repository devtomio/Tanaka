const { MongoDBProvider } = require('commando-provider-mongo');
const { MongoClient } = require('mongodb');
const Client = require('./Structures/Client');
const path = require('path');

const client = new Client();

client.setProvider(
	MongoClient.connect(client.db.url, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	}).then((c) => new MongoDBProvider(c, 'tanaka')),
);

client.registry
	.registerDefaultTypes()
	.registerGroups([
		{ id: 'util', name: 'Utility' },
		{ id: 'random', name: 'Random Response' },
	])
	.registerDefaultGroups()
	.registerDefaultCommands({
		unknownCommand: false,
		help: false,
		eval: false,
		ping: false,
	})
	.registerCommandsIn(path.join(__dirname, 'Commands'));

client.once('ready', () => {
	const userCount = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
	const commandCount = client.registry.commands.size;
	const guildCount = client.guilds.cache.size;

	const statuses = [`${userCount} users`, `${commandCount} commands`, `${guildCount} guilds`];

	const status = `t!help | ${statuses[Math.floor(Math.random() * statuses.length)]}`;

	setInterval(() => client.user.setActivity(status, { type: 'WATCHING' }), 30000);

	client.logger.info(`Logged in as ${client.user.tag}.`);
});

client.on('debug', client.logger.debug);

client.on('error', (e) => client.logger.error(e.stack));

client.db.once('ready', () => client.logger.info('MongoDB is ready!'));

client.db.on('debug', client.logger.debug);

client.db.on('error', (e) => client.logger.error(e.stack));

client.login();
