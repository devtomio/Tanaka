const { CommandoClient } = require('discord.js-commando');
const { Database } = require('quickmongo');
const { Intents } = require('discord.js');
const consola = require('consola');

module.exports = class Client extends CommandoClient {
	constructor() {
		super({
			commandPrefix: process.env.COMMAND_PREFIX,
			owner: process.env.OWNER_ID,
			invite: process.env.SUPPORT_SERVER,
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
	}

	async login(token = process.env.DISCORD_TOKEN) {
		return super.login(token);
	}
};
