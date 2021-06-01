const { Command } = require('discord.js-commando');

module.exports = class BlacklistCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'blacklist',
			aliases: ['bl'],
			memberName: 'blacklist',
			group: 'util',
			description: 'Blacklists a user from using the bot.',
			guarded: true,
			ownerOnly: true,
			args: [
				{
					key: 'user',
					prompt: 'Who is the user that you want to blacklist?',
					type: 'user',
				},
				{
					key: 'reason',
					prompt: 'What is the reason?',
					type: 'string',
					default: 'No reason provided.',
				},
			],
		});
	}

	async run(msg, { user, reason }) {
		const blacklist = await this.client.db.get(`blacklist-${user.id}`);

		if (blacklist) return msg.reply('That user is already blacklisted!');

		await this.client.db.set(`blacklist-${user.id}`, { reason });

		return msg.say(`Successfully blacklisted **${user.tag}** for \`${reason}\`.`);
	}
};
