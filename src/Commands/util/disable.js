const { Command } = require('discord.js-commando');

module.exports = class DisableCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'disable',
			aliases: ['disable-command', 'disable-cmd', 'cmd-off', 'command-off'],
			group: 'util',
			description: 'Disables a command.',
			guarded: true,
			memberName: 'disable',
			args: [
				{
					key: 'cmdOrGrp',
					label: 'command/group',
					prompt: 'Which command or group would you like to disable?',
					type: 'group|command',
				},
			],
			userPermissions: ['MANAGE_GUILD'],
		});
	}

	run(msg, { cmdOrGrp }) {
		if (cmdOrGrp.isEnabledIn(msg.guild, true))
			return msg.reply(
				`The \`${cmdOrGrp.name}\` ${cmdOrGrp.group ? 'command' : 'group'} is already disabled.`,
			);
		if (cmdOrGrp.guarded)
			return msg.reply(
				`You cannot disable the \`${cmdOrGrp.name}\` ${cmdOrGrp.group ? 'command' : 'group'}.`,
			);

		cmdOrGrp.setEnabledIn(msg.guild, false);

		return msg.reply(`Disabled the \`${cmdOrGrp.name}\` ${cmdOrGrp.group ? 'command' : 'group'}.`);
	}
};
