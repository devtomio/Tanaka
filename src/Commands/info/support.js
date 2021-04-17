const { Command } = require('discord.js-commando');

module.exports = class SupportCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'support',
			aliases: ['support-server'],
			group: 'info',
			memberName: 'support',
			description: 'Sends the support server of the bot.',
		});
	}

	run(msg) {
		return msg.embed({ description: 'https://discord.gg/zGvtAnGhdP' });
	}
};
