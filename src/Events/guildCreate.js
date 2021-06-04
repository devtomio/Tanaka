const Event = require('../Structures/Event');

module.exports = class GuildCreateEvent extends Event {
	constructor(...args) {
		super(...args, 'guildCreate');
	}

	/** @param {import('discord.js').Guild} guild */
	async run(guild) {
		if (
			guild.available &&
			guild.systemChannel &&
			guild.systemChannel.permissionsFor(this.client.user).has('SEND_MESSAGES')
		) {
			try {
				const usage = this.client.registry.commands.get('help').usage();

				await guild.systemChannel.send(
					`Hi there, my name is Tanaka! Use ${usage} to see my list of commands!`,
				);
			} catch {}
		}
	}
};
