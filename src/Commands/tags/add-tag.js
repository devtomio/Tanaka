const { Command } = require('discord.js-commando');
const moment = require('moment');

module.exports = class AddTagCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'add-tag',
			aliases: ['addtag'],
			memberName: 'add-tag',
			group: 'tags',
			description: 'Adds a new tag.',
			guildOnly: true,
			args: [
				{
					key: 'name',
					prompt: 'What is the tag name?',
					type: 'string',
				},
				{
					key: 'content',
					prompt: 'What is the tag content?',
					type: 'string',
				},
			],
		});
	}

	async run(msg, { name, content }) {
		const tags = await this.client.db.get(`tags_${msg.guild.id}-${name}`);

		if (tags) return msg.reply('That tag already exists!');

		await this.client.db.set(`tags_${msg.guild.id}-${name}`, {
			name,
			content,
			creatorName: msg.author.tag,
			creatorID: msg.author.id,
			date: moment().format('MMMM Do YYYY, h:mm:ss a'),
		});

		return msg.say(`Tag **${name}** created successfully.`);
	}
};
