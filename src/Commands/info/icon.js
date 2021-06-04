const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class IconCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'icon',
			aliases: ['guild-icon'],
			memberName: 'icon',
			group: 'info',
			description: 'Shows the icon of the guild.',
			guildOnly: true,
		});
	}

	run(msg) {
		const isAnimated = msg.guild.icon ? msg.guild.icon.startsWith('a_') : false;
		const embed = new MessageEmbed()
			.setTitle(`**${msg.guild.name}'s Icon**`)
			.setDescription(
				`[JPG](${msg.guild.iconURL({
					size: 4096,
				})}) | [PNG](${msg.guild.iconURL({
					format: 'png',
					size: 4096,
				})}) | [WEBP](${msg.guild.iconURL({ size: 4096 })}) ${
					isAnimated ? `| [GIF](${msg.guild.iconURL({ dynamic: true, size: 4096 })})` : ''
				}`,
			)
			.setImage(msg.guild.iconURL({ dynamic: true, size: 4096 }))
			.setFooter(`Requested by ${msg.author.tag}`, msg.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		return msg.embed(embed);
	}
};
