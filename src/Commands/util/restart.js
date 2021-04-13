const { Command } = require('discord.js-commando');

module.exports = class RestartCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'restart',
			aliases: ['rs'],
			group: 'util',
			ownerOnly: true,
			guarded: true,
			description: 'Restarts the bot.',
			details: 'Only the bot owner may use this command.',
		});
	}

	async run(msg) {
		await msg.react(':white_check_mark:');
		process.exit();
	}
};
