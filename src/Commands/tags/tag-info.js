const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const { MessageEmbed } = require('discord.js');

module.exports = class TagInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'tag-info',
			aliases: ['taginfo'],
			memberName: 'tag-info',
			group: 'tags',
			description: 'Displays information about a tag.',
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

		const creator = await this.client.users.fetch(tag.creatorID);
		const embed = new MessageEmbed()
			.setTitle(`**Tag __${tag.name}__**`)
			.setThumbnail(creator.displayAvatarURL({ dynamic: true, size: 4096 }))
			.setDescription(
				stripIndents`
				**Content:** ${tag.content}

				**Created By:** ${tag.creatorName}
				**Time Created:** ${tag.date}
			`,
			)
			.setFooter('Tags are guild-based!')
			.setColor('RANDOM')
			.setTimestamp();

		return msg.say(embed);
	}
};
