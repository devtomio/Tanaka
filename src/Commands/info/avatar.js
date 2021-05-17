const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class AvatarCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'avatar',
			aliases: ['av', 'profile-image'],
			memberName: 'avatar',
			group: 'info',
			description: 'Shows the avatar url of the user.',
			args: [
				{
					key: 'user',
					prompt: 'Who is the user that you want to get the avatar url of?',
					type: 'user',
					default: (msg) => msg.author,
				},
			],
		});
	}

	run(msg, { user }) {
		const isAnimated = user.avatar ? user.avatar.startsWith('a_') : false;
		const embed = new MessageEmbed()
			.setTitle(`**${user.tag}'s Avatar**`)
			.setDescription(
				`[JPG](${user.displayAvatarURL({
					format: 'jpg',
					size: 4096,
				})}) | [PNG](${user.displayAvatarURL({
					format: 'png',
					size: 4096,
				})}) | [WEBP](${user.displayAvatarURL({ size: 4096 })}) ${
					isAnimated
						? `| [GIF](${user.displayAvatarURL({ dynamic: true, size: 4096 })})`
						: ''
				}`,
			)
			.setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))
			.setColor('RANDOM')
			.setFooter(`Requested by ${msg.author.tag}`, msg.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		return msg.embed(embed);
	}
};
