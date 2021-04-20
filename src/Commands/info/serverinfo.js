const { filterLevels, verificationLevels, regions } = require('../../Structures/Util');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class ServerInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'serverinfo',
			aliases: ['server', 'server-info', 'guild'],
			group: 'info',
			memberName: 'serverinfo',
			description: "Responds with the server's general information.",
			clientPermissions: ['EMBED_LINKS'],
			guildOnly: true,
		});
	}

	async run(msg) {
		const roles = msg.guild.roles.cache
			.sort((a, b) => b.position - a.position)
			.map((role) => role.toString());
		const members = msg.guild.members.cache;
		const channels = msg.guild.channels.cache;
		const emojis = msg.guild.emojis.cache;
		const owner = await msg.guild.fetchOwner();

		const embed = new MessageEmbed()
			.setTitle(`**Guild Information for __${msg.guild.name}__**`)
			.setColor('RANDOM')
			.setThumbnail(msg.guild.iconURL({ dynamic: true, size: 4096 }))
			.addField('General', [
				`**❯ Name:** ${msg.guild.name}`,
				`**❯ ID:** ${msg.guild.id}`,
				`**❯ Owner:** ${owner.user.tag} \`(${msg.guild.ownerID})\``,
				`**❯ Region:** ${regions[msg.guild.region]}`,
				`**❯ Boost Tier:** ${msg.guild.premiumTier ? `Tier ${msg.guild.premiumTier}` : 'None'}`,
				`**❯ Explicit Filter:** ${filterLevels[msg.guild.explicitContentFilter]}`,
				`**❯ Verification Level:** ${verificationLevels[msg.guild.verificationLevel]}`,
				`**❯ Time Created:** \`${moment(msg.guild.createdTimestamp).format('LT')} ${moment(
					msg.guild.createdTimestamp,
				).format('LL')} ${moment(msg.guild.createdTimestamp).fromNow()}\``,
				'\u200b',
			])
			.addField('Statistics', [
				`**❯ Role Count:** ${roles.length}`,
				`**❯ Emoji Count:** ${emojis.size}`,
				`**❯ Member Count:** ${msg.guild.memberCount}`,
				`**❯ Humans:** ${members.filter((member) => !member.user.bot).size}`,
				`**❯ Bots:** ${members.filter((member) => member.user.bot).size}`,
				`**❯ Text Channels:** ${channels.filter((channel) => channel.type === 'text').size}`,
				`**❯ Voice Channels:** ${channels.filter((channel) => channel.type === 'voice').size}`,
				`**❯ Category Channels:** ${
					channels.filter((channel) => channel.type === 'category').size
				}`,
				`**❯ News Channels:** ${channels.filter((channel) => channel.type === 'news').size}`,
				`**❯ Stage Channels:** ${channels.filter((channel) => channel.type === 'stage').size}`,
				`**❯ Boost Count:** ${msg.guild.premiumSubscriptionCount ?? '0'}`,
				'\u200b',
			])
			.addField('Presence', [
				`**❯ Online:** ${members.filter((member) => member.presence.status === 'online').size}`,
				`**❯ Idle:** ${members.filter((member) => member.presence.status === 'idle').size}`,
				`**❯ Do Not Disturb:** ${
					members.filter((member) => member.presence.status === 'dnd').size
				}`,
				`**❯ Offline:** ${
					members.filter((member) => member.presence.status === 'offline').size
				}`,
				'\u200b',
			])
			.setTimestamp();

		return msg.say(embed);
	}
};
