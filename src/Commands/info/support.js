const Command = require('../../Structures/Command');

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
		return msg.embed({
			description: 'https://discord.gg/zGvtAnGhdP',
			color: 'RANDOM',
			title: '<:handheartfill:848892406803202068> Join our Support Server!',
		});
	}
};
