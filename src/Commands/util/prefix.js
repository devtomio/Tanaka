const Command = require('../../Structures/Command');
const { stripIndents } = require('common-tags');

module.exports = class PrefixCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'prefix',
			group: 'util',
			memberName: 'prefix',
			description: 'Shows or sets the command prefix',
			format: '[prefix/"default"/"none"]',
			guarded: true,
			args: [
				{
					key: 'prefix',
					prompt: "What would you like to set the bot's prefix to?",
					type: 'string',
					max: 20,
					default: '',
				},
			],
			userPermissions: ['MANAGE_GUILD'],
		});
	}

	async run(msg, { prefix }) {
		if (!prefix) {
			const prefix = msg.guild ? msg.guild.commandPrefix : this.client.commandPrefix;

			return msg.reply(stripIndents`
				${prefix ? `The command prefix is \`${prefix}\`.` : 'There is no command prefix.'}
				To run commands, use ${msg.anyUsage('command')}
			`);
		}

		if (!msg.guild && !this.client.isOwner(msg.author))
			return msg.reply('Only the bot owner(s) may change the global command prefix.');

		const lowercase = prefix.toLowerCase();
		const pref = lowercase === 'none' ? '' : prefix;
		let response;

		if (lowercase === 'default') {
			if (msg.guild) msg.guild.commandPrefix = null;
			else this.client.commandPrefix = null;

			const current = this.client.commandPrefix ? `\`${this.client.commandPrefix}\`` : 'no prefix';

			response = `Reset the command prefix to the default (currently ${current}).`;
		} else {
			if (msg.guild) msg.guild.commandPrefix = pref;
			else this.client.commandPrefix = pref;

			response = pref
				? `Set the command prefix to \`${prefix}\`.`
				: 'Removed the command prefix entirely.';
		}

		await msg.reply(`${response} To run commands, use ${msg.anyUsage('command')}.`);

		return null;
	}
};
