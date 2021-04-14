const { userFlags, trimArray } = require('../../Structures/Util');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class UserInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'userinfo',
			aliases: ['user', 'user-info'],
			group: 'info',
			memberName: 'userinfo',
			description: "Responds with the user's general information.",
			clientPermissions: ['EMBED_LINKS'],
			guildOnly: true,
			args: [
				{
					key: 'member',
					prompt: 'Who is the user that you want to get info of?',
					type: 'member',
					default: (m) => m.member,
				},
			],
		});
	}

	run(msg, { member }) {
		const roles = member.roles.cache
			.sort((a, b) => b.position - a.position)
			.map((role) => role.toString())
			.slice(0, -1);
		const flags = member.user.flags.toArray();

		const embed = new MessageEmbed()
			.setTitle(`**User Information for __${msg.author.tag}__**`)
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
			.setColor('RANDOM')
			.addField('User', [
				`**❯ Username**: ${member.user.username}`,
				`**❯ Discriminator:** ${member.user.discriminator}`,
				`**❯ ID:** \`${member.id}\``,
				`**❯ Flags:** ${
					flags.length ? flags.map((flag) => userFlags[flag]).join(', ') : 'None'
				}`,
				`**❯ Avatar:** [Link to Avatar](${member.user.displayAvatarURL({
					size: 4096,
					dynamic: true,
				})})`,
				`**❯ Time Created:** \`${moment(member.user.createdTimestamp).format('LT')} ${moment(
					member.user.createdTimestamp,
				).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}\``,
				`**❯ Status:** ${member.user.presence.status}`,
				`**❯ Game:** ${member.user.presence.game || 'Not playing a game.'}`,
				`**❯ Bot:** ${member.user.bot ? 'Yes' : 'No'}`,
				'\u200b',
			])
			.addField('Member', [
				`**❯ Highest Role:** ${
					member.roles.highest.id === msg.guild.id ? 'None' : member.roles.highest.name
				}`,
				`**❯ Server Join Rate:** \`${moment(member.joinedAt).format('LL LTS')}\``,
				`**❯ Nickname:** ${member.nickname ?? 'None'}`,
				`**❯ Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
				`**❯ Roles [${roles.length}]:** ${
					roles.length < 10
						? roles.join(', ')
						: roles.length > 10
						? trimArray(roles)
						: 'None'
				}`,
			])
			.setTimestamp();

		return msg.say(embed);
	}
};
