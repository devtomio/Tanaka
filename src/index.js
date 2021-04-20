const { MongoDBProvider } = require('commando-provider-mongo');
const { MessageEmbed, WebhookClient } = require('discord.js');
const { htmlToText } = require('html-to-text');
const Client = require('./Structures/Client');
const { MongoClient } = require('mongodb');
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
		{ id: 'util', name: 'Utility', guarded: true },
		{ id: 'random', name: 'Random Response' },
		{ id: 'info', name: 'Information' },
		{ id: 'search', name: 'Search' },
		{ id: 'remind', name: 'Reminder' },
		{ id: 'anime-updates', name: 'Anime Updates' },
		{ id: 'codebin', name: 'Code Bins' },
		{ id: 'img', name: 'Image Manipulation' },
	])
	.registerDefaultGroups()
	.registerDefaultCommands({
		unknownCommand: false,
		help: false,
		eval: false,
		ping: false,
	})
	.registerTypesIn(path.join(__dirname, 'Types'))
	.registerCommandsIn(path.join(__dirname, 'Commands'));

client.once('ready', async () => {
	await client.timers.fetchAll();

	const userCount = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
	const commandCount = client.registry.commands.size;
	const guildCount = client.guilds.cache.size;

	const statuses = [`${userCount} users`, `${commandCount} commands`, `${guildCount} guilds`];

	const status = `t!help | ${statuses[Math.floor(Math.random() * statuses.length)]}`;

	client.setInterval(() => client.user.setActivity(status, { type: 'WATCHING' }), 30000);

	client.logger.info(`Logged in as ${client.user.tag}.`);
});

client.on('debug', client.logger.debug);

client.on('error', (e) => client.logger.error(e.stack));

client.db.once('ready', () => client.logger.info('MongoDB is ready!'));

client.db.on('debug', client.logger.debug);

client.db.on('error', (e) => client.logger.error(e.stack));

client.rss.on('item:new:anime', (item) => {
	client.guilds.cache.forEach(async (guild) => {
		const data = await client.db.get(`animeUpdates-${guild.id}`);

		if (data === null) return false;

		const hook = new WebhookClient(data.id, data.token);
		const embed = new MessageEmbed()
			.setTitle(`**${item.title}**`)
			.setDescription(htmlToText(item.description))
			.setURL(item.link)
			.setColor('RANDOM')
			.setImage('https://kevinpennyfeather.files.wordpress.com/2018/03/logo.jpg')
			.setTimestamp();

		hook.send(embed);
	});
});

client.login();
