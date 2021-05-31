const { Command } = require('discord.js-commando');

module.exports = class TagCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'tag',
			aliases: ['t'],
			memberName: 'tag',
			group: 'tags',
			description: 'Gets the content of a tag.',
			guildOnly: true,
			args: [
				{
					key: 'name',
					prompt: 'What is the name of the tag?',
					type: 'string',
				},
			],
		});
	}

	async run(msg, { name }) {
		const tag = await this.client.db.get(`tags_${msg.guild.id}-${name}`);

		if (!tag) return msg.reply('That tag does not exist.');

		return msg.say(tag.content);
	}
};
