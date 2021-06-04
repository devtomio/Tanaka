const Command = require('../../Structures/Command');

module.exports = class RestartCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'restart',
			aliases: ['rs'],
			group: 'util',
			memberName: 'restart',
			ownerOnly: true,
			guarded: true,
			description: 'Restarts the bot.',
			details: 'Only the bot owner may use this command.',
		});
	}

	async run(msg) {
		await msg.say('Byee!');
		process.exit();
	}
};
