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
			args: [
				{
					key: 'user',
					prompt: 'Who is the user that you want to get info of?',
					type: 'user',
					default: (m) => m.author,
				},
			],
		});
	}

	async run(msg, { user }) {
		if (!user) user = msg.author;

		const flags = user.flags.toArray();
		const embed = new MessageEmbed()
			.setTitle(`**User Information for __${user.tag}__**`)
			.setThumbnail(user.displayAvatarURL({ dynamic: true, size: 4096 }))
			.setColor('RANDOM')
			.addField('User', [
				`**<:user1:848729325980876842> Username**: ${user.username}`,
				`**<:discrim:848729585122148363> Discriminator:** ${user.discriminator}`,
				`**<:tag:848730567259193404> ID:** \`${user.id}\``,
				`**<:flag:848733314956394528> Flags:** ${
					flags.length ? flags.map((flag) => userFlags[flag]).join(', ') : 'None'
				}`,
				`**<:image:848733689210208267> Avatar:** [Link to Avatar](${user.displayAvatarURL({
					size: 4096,
					dynamic: true,
				})})`,
				`**<:clock1k:848734465102708766> Time Created:** \`${moment(
					user.createdTimestamp,
				).format('LT')} ${moment(user.createdTimestamp).format('LL')} ${moment(
					user.createdTimestamp,
				).fromNow()}\``,
				`**<:robotfill:848737114287636480> Bot:** ${user.bot ? 'Yes' : 'No'}`,
			])
			.setTimestamp();

		if (msg.guild) {
			try {
				const member = await msg.guild.members.fetch(user.id);
				const roles = member.roles.cache
					.sort((a, b) => b.position - a.position)
					.map((role) => role.toString())
					.slice(0, -1);

				embed.addField('Member', [
					`**<:arrowupcircle:848737425752981514> Highest Role:** ${
						member.roles.highest.id === msg.guild.id
							? 'None'
							: `<@&${member.roles.highest.id}>`
					}`,
					`**<:calendarrr:848737884894396436> Server Join Date:** \`${moment(
						member.joinedAt,
					).format('LL LTS')}\``,
					`**<:user1:848729325980876842> Nickname:** ${member.nickname ?? 'None'}`,
					`**<:userplus:848738795964596315> Hoist Role:** ${
						member.roles.hoist ? `<@&${member.roles.hoist.id}>` : 'None'
					}`,
					`**<:pluscircle:848739003729838090> Roles [${roles.length}]:** ${
						roles.length ? trimArray(roles).join(', ') : 'None'
					}`,
				]);
			} catch {}
		}

		return msg.say(embed);
	}
};
