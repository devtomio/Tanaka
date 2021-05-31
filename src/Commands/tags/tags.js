const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');

module.exports = class TagsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'tags',
			aliases: ['list-tags'],
			memberName: 'tags',
			group: 'tags',
			description: 'List the tags on the current server.',
			guildOnly: true,
		});
	}

	async run(msg) {
		const res = (await this.client.db.all())
			.filter((data) => data.ID.startsWith(`tags_${msg.guild.id}`))
			.sort((a, b) => b.data - a.data);
		let content = '';

		res.forEach((re) => {
			let user = this.client.users.cache.find((m) => m.id === re.ID.split('_')[1]);

			if (!user) user = 'Unknown User';

			content += `**\`${re.data.name}\`** | **Owner:** ${re.data.creatorName}\n`;
		});

		return msg.say(stripIndents`
			**${msg.guild.name}'s Tags**

			${content || 'No Tags in this guild.'}
		`);
	}
};
