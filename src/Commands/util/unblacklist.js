const { Command } = require('discord.js-commando');

module.exports = class UnblacklistCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'unblacklist',
			aliases: ['unbl'],
			memberName: 'unblacklist',
			group: 'util',
			description: 'Unblacklists a user.',
			guarded: true,
			ownerOnly: true,
			args: [
				{
					key: 'user',
					prompt: 'Who is the user that you want to unblacklist?',
					type: 'user',
				},
			],
		});
	}

	async run(msg, { user }) {
		const blacklist = await this.client.db.get(`blacklist-${user.id}`);

		if (!blacklist) return msg.reply('That user is not blacklisted!');

		await this.client.db.delete(`blacklist-${user.id}`);

		return msg.say(`Successfully unblacklisted **${user.tag}**!`);
	}
};
