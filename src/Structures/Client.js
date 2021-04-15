const { CommandoClient } = require('discord.js-commando');
const { Intents, WebhookClient } = require('discord.js');
const { FeedEmitter } = require('rss-emitter-ts');
const { Database } = require('quickmongo');
const consola = require('consola');

module.exports = class Client extends CommandoClient {
	constructor() {
		super({
			commandPrefix: process.env.COMMAND_PREFIX,
			owner: process.env.OWNER_ID,
			intents: [Intents.NON_PRIVILEGED, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES],
			partials: ['CHANNEL'],
		});

		this.db = new Database(process.env.MONGO_URL, 'tanaka', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		this.logger = consola.create({
			level: 5,
		});

		this.rss = new FeedEmitter();

		this.testWebhook = new WebhookClient(process.env.TEST_WEBHOOK_ID, process.env.TEST_WEBHOOK_TOKEN);
	}

	async login(token = process.env.DISCORD_TOKEN) {
		this.addRSSListeners();

		return super.login(token);
	}

	addRSSListeners() {
		const feeds = [
			{ url: 'https://www.crunchyroll.com/rss', refresh: 20000, eventName: 'anime:crunchyroll' },
			{ url: 'https://myanimelist.net/rss/news.xml', refresh: 20000, eventName: 'anime:mal' },
		];

		feeds.forEach((feed) => this.rss.add(feed));
	}
};
