const { CommandoClient } = require('discord.js-commando');
const { Database } = require('quickmongo');
const { Intents } = require('discord.js');
const RSSFeedEmitter = require('rss-feed-emitter');
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

		this.rss = new RSSFeedEmitter({
			userAgent: 'TanakaBot 1.0.0 (https://github.com/1chiSensei/Tanaka)',
		}).add({ url: 'https://www.crunchyroll.com/rss', refresh: 2000, eventName: 'anime-crunchyroll' });
	}

	async login(token = process.env.DISCORD_TOKEN) {
		return super.login(token);
	}
};
