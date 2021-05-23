const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');

module.exports = class GroupsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'groups',
			aliases: ['list-groups', 'show-groups'],
			group: 'util',
			memberName: 'groups',
			description: 'Lists all command groups.',
			guarded: true,
		});
	}

	run(msg) {
		return msg.reply(stripIndents`
			__**Groups**__
			${this.client.registry.groups
				.map((grp) => `**${grp.name}:** ${grp.isEnabledIn(msg.guild) ? 'Enabled' : 'Disabled'}`)
				.join('\n')}
		`);
	}
};
