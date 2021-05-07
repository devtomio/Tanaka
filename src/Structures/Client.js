const { CommandoClient } = require('discord.js-commando');
const { Intents, WebhookClient } = require('discord.js');
const { FeedEmitter } = require('rss-emitter-ts');
const TimerManager = require('./TimerManager');
const { Database } = require('quickmongo');
const { Manager } = require('erela.js');
const Turndown = require('turndown');
const BotList = require('./BotList');
const consola = require('consola');
const Redis = require('./Redis');
const web = require('../Web');

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

		this.redis = new Redis(this).db;

		this.timers = new TimerManager(this);

		this.converter = new Turndown();

		this.bl = new BotList(this);

		this.client = this;

		this.manager = new Manager({
			send: (id, payload) => {
				const guild = this.guilds.cache.get(id);

				if (guild) guild.shard.send(payload);
			},
		});
	}

	async login(token = process.env.DISCORD_TOKEN) {
		this.addRSSListeners();
		web(this);

		return super.login(token);
	}

	addRSSListeners() {
		const feeds = [
			{
				url: 'https://www.animenewsnetwork.com/all/rss.xml?ann-edition=us',
				refresh: 20000,
				eventName: 'anime',
				ignoreFirst: true,
			},
		];

		feeds.forEach((feed) => this.rss.add(feed));
	}

	generateCommandList() {
		const list = this.registry.groups
			.map((g) => {
				const commands = g.commands.filter((c) => !c.hidden);
				return `\n<h3>${g.name}:</h3>\n\n<ul>${commands
					.map((c) => {
						const extra = `${c.ownerOnly ? ' (Owner-Only)' : ''}${
							c.nsfw ? ' (NSFW)' : ''
						}`;
						return `<li> <strong>${c.name}:</strong> ${c.description}${extra}</li>`;
					})
					.join('</ul>\n')}`;
			})
			.join('\n');

		return list;
	}
};
