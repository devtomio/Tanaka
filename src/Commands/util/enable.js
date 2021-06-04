const Command = require('../../Structures/Command');

module.exports = class EnableCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'enable',
			aliases: ['enable-command', 'enable-cmd', 'cmd-on', 'command-on'],
			group: 'util',
			memberName: 'enable',
			description: 'Enables a command or command group.',
			guarded: true,
			args: [
				{
					key: 'cmdOrGrp',
					label: 'command/group',
					prompt: 'Which command or group would you like to enable?',
					type: 'group|command',
				},
			],
			userPermissions: ['MANAGE_GUILD'],
		});
	}

	run(msg, { cmdOrGrp }) {
		const { group } = cmdOrGrp;

		if (cmdOrGrp.isEnabledIn(msg.guild, true))
			return msg.reply(
				`The \`${cmdOrGrp.name}\` ${cmdOrGrp.group ? 'command' : 'group'} is already enabled${
					group && !group.isEnabledIn(msg.guild)
						? `, but the \`${group.name}\` group is disabled, so it still can't be used`
						: ''
				}.`,
			);

		cmdOrGrp.setEnabledIn(msg.guild, true);

		return msg.reply(
			`Enabled the \`${cmdOrGrp.name}\` ${group ? 'command' : 'group'}${
				group && !group.isEnabledIn(msg.guild)
					? `, but the \`${group.name}\` group is disabled, so it still can't be used`
					: ''
			}.`,
		);
	}
};
