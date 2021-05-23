const Event = require('../Structures/Event');

module.exports = class ReadyEvent extends Event {
	constructor(...args) {
		super(...args, 'ready', { once: true });
	}

	async run() {
		this.client.setTimeout(() => this.client.manager.init(this.client.user.id), 5000);

		await this.client.timers.fetchAll();

		const commandCount = this.client.registry.commands.size;
		const userCount = await this.client.userCount();
		const guildCount = await this.client.guildCount();
		const channelCount = await this.client.channelCount();

		const statuses = [
			`${userCount} users`,
			`${commandCount} commands`,
			`${guildCount} guilds`,
			`${channelCount} channels`,
			'https://tanaka-bot.me',
		];
		let i = 0;

		this.client.setInterval(
			() =>
				this.client.user.setActivity(`t!help | ${statuses[i++ % statuses.length]}`, {
					type: 'WATCHING',
				}),
			30000,
		);

		this.client.logger.info(`Logged in as ${this.client.user.tag}.`);
	}
};
