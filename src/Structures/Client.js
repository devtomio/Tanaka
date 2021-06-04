const InteractiveClient = require('@duxcore/interactive-discord').default;
const { Intents, WebhookClient, Collection } = require('discord.js');
const { MongoDBProvider } = require('commando-provider-mongo');
const { CommandoClient } = require('discord.js-commando');
const TimerManager = require('./TimerManager');
const { execSync } = require('child_process');
const { Velocity } = require('velocity-api');
const { MongoClient } = require('mongodb');
const { Database } = require('quickmongo');
const APIClient = require('./APIClient');
const OpenEval = require('open-eval');
const glob = require('glob-promise');
const Turndown = require('turndown');
const snoowrap = require('snoowrap');
const BotList = require('./BotList');
const logger = require('./Logger');
const Redis = require('./Redis');
const web = require('../Web');
const path = require('path');

module.exports = class Client extends CommandoClient {
	constructor(options) {
		super({
			commandPrefix: process.env.COMMAND_PREFIX,
			owner: process.env.OWNER_ID,
			intents: [Intents.NON_PRIVILEGED, Intents.FLAGS.GUILDS],
			partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE'],
			allowedMentions: {
				repliedUser: false,
				parse: ['roles', 'users'],
			},
			...options,
		});

		this.db = new Database('mongodb://127.0.0.1:27017', 'tanaka', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		this.logger = logger;

		this.testWebhook = new WebhookClient(process.env.TEST_WEBHOOK_ID, process.env.TEST_WEBHOOK_TOKEN);

		this.redis = new Redis(this).db;

		this.timers = new TimerManager(this);

		this.converter = new Turndown().addRule('hyperlink', {
			filter: 'a',
			replacement: (text, node) => `[${text}](https://developer.mozilla.org${node.href})`,
		});

		this.bl = new BotList(this);

		this.client = this;

		this.events = new Collection();

		this.piston = new OpenEval();

		this.reddit = new snoowrap({
			userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2869.0 Safari/537.36',
			username: 'TomioCodes',
			password: process.env.REDDIT_PASSWORD,
			clientId: process.env.REDDIT_CLIENT_ID,
			clientSecret: process.env.REDDIT_CLIENT_SECRET,
		});

		this.perspective = new Velocity(process.env.PERSPECTIVE_KEY);

		this.process = process;

		this.bots = new WebhookClient(process.env.BOTS_ID, process.env.BOTS_TOKEN);

		this.interactions = new InteractiveClient(this, process.env.CLIENT_ID);

		this.request = APIClient;
	}

	get ip() {
		const ip = execSync('curl https://ipecho.net/plain', { timeout: 30000, encoding: 'utf-8' });
		return ip;
	}

	get directory() {
		return `${path.dirname(require.main.filename)}${path.sep}`;
	}

	async userCount() {
		if (this.shard) {
			const count = await this.shard.broadcastEval(
				'this.guilds.cache.reduce((a, b) => a + b.memberCount, 0)',
			);

			return count.reduce((a, b) => a + b, 0);
		}

		return this.guilds.cache.reduce((a, b) => a + b.memberCount, 0);
	}

	async guildCount() {
		if (this.shard) {
			const count = await this.shard.fetchClientValues('guilds.cache.size');

			return count.reduce((a, b) => a + b, 0);
		}

		return this.guilds.cache.size;
	}

	async channelCount() {
		if (this.shard) {
			const count = await this.shard.fetchClientValues('channels.cache.size');

			return count.reduce((a, b) => a + b, 0);
		}

		return this.channels.cache.size;
	}

	async login(token = process.env.BOT_TOKEN) {
		this.registerInhibitors();
		this.registerCommands();
		this.loadSimilarEvents();
		web(this);

		await this.loadEvents();
		await this.registerProvider();

		return super.login(token);
	}

	async loadEvents() {
		const events = await glob(`${this.directory}Events/**/*.js`);

		for (const eventFile of events) {
			delete require.cache[eventFile];

			const File = require(eventFile);
			const event = new File(this.client);

			this.events.set(event.name, event);
			event.emitter[event.type](event.name, (...args) => event.run(...args));

			this.logger.info(`[Client]: Loaded event "${event.name}"`);
		}
	}

	registerInhibitors() {
		this.dispatcher.addInhibitor((msg) => {
			this.db.get(`blacklist-${msg.author.id}`).then((blacklist) => {
				if (blacklist)
					return {
						reason: blacklist.reason,
						response: msg.reply(
							`You're blacklisted for using this bot!\nReason: ${blacklist.reason}`,
						),
					};
			});
		});
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

	registerCommands() {
		this.client.registry
			.registerDefaultTypes()
			.registerGroups([
				{ id: 'util', name: 'Utility' },
				{ id: 'random', name: 'Random Response' },
				{ id: 'info', name: 'Information' },
				{ id: 'search', name: 'Search' },
				{ id: 'remind', name: 'Reminder' },
				{ id: 'codebin', name: 'Code Bins' },
				{ id: 'img', name: 'Image Manipulation' },
				{ id: 'nsfw', name: 'NSFW' },
				{ id: 'other', name: 'Other' },
				{ id: 'bots', name: 'Bots' },
				{ id: 'anime', name: 'Anime' },
				{ id: 'tags', name: 'Tags' },
			])
			.registerDefaultGroups()
			.registerDefaultCommands({
				unknownCommand: false,
				help: false,
				eval: false,
				ping: false,
				commandState: false,
				prefix: false,
			})
			.registerTypesIn(path.join(__dirname, '..', 'Types'))
			.registerCommandsIn(path.join(__dirname, '..', 'Commands'));
	}

	loadSimilarEvents() {
		this.db
			.on('ready', () => this.logger.info('[MongoDB]: Ready!'))
			.on('error', (err) => {
				throw err;
			})
			.on('debug', (data) => this.logger.debug(`[MongoDB]: ${data}`));
	}

	async registerProvider() {
		const mongo = await MongoClient.connect('mongodb://127.0.0.1:27017', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		this.setProvider(new MongoDBProvider(mongo, 'tanaka'));
	}
};
