const { Command } = require('discord.js-commando');
const didYouMean = require('didyoumean2').default;

module.exports = class UnknownCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'unknown-command',
			group: 'util',
			memberName: 'unknown-command',
			description: 'The unknown command.',
			hidden: true,
			guarded: true,
			unknown: true,
		});
	}

	run(msg) {
		const cmdList = this.client.registry.commands.map((c) => c.name);
		const mean = didYouMean(msg.content, cmdList);

		if (mean === null)
			return msg.reply(
				`Unknown command. Use \`${msg.guild.commandPrefix}help\` or \`${this.client.user.tag} help\` to view the command list.`,
			);
		if (typeof mean === 'string')
			return msg.reply(
				`Unknown command. Use \`${msg.guild.commandPrefix}help\` or \`${this.client.user.tag} help\` to view the command list.\n\nDid you mean? \`${mean}\``,
			);
		if (Array.isArray(mean))
			return msg.reply(
				`Unknown command. Use \`${msg.guild.commandPrefix}help\` or \`${
					this.client.user.tag
				} help\` to view the command list.\n\nDid you mean? ${mean
					.map((cm) => `\`${cm}\``)
					.join(', ')}`,
			);
	}
};
