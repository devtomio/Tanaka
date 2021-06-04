const { filterLevels, verificationLevels, regions } = require('../../Structures/Util');
const Command = require('../../Structures/Command');
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
				`**<:user1:848729325980876842> Name:** ${msg.guild.name}`,
				`**<:tag:848730567259193404> ID:** ${msg.guild.id}`,
				`**<:shielduserfill:848774692826251304> Owner:** ${owner.user.tag} \`(${msg.guild.ownerID})\``,
				`**<:flagfill1:848775261842702357> Region:** ${regions[msg.guild.region]}`,
				`**<:chatuploadfill:848775733094252575> Boost Tier:** ${
					msg.guild.premiumTier ? `Tier ${msg.guild.premiumTier}` : 'None'
				}`,
				`**<:filterfill:848776197922881587> Explicit Filter:** ${
					filterLevels[msg.guild.explicitContentFilter]
				}`,
				`**<:arrowupsline:848776601352011826> Verification Level:** ${
					verificationLevels[msg.guild.verificationLevel]
				}`,
				`**<:clock1k:848734465102708766> Time Created:** \`${moment(
					msg.guild.createdTimestamp,
				).format('LT')} ${moment(msg.guild.createdTimestamp).format('LL')} ${moment(
					msg.guild.createdTimestamp,
				).fromNow()}\``,
				`**<:errorwarningfill:848776991183994880> NSFW:** ${msg.guild.nsfw ? 'Yes' : 'No'}`,
				'\u200b',
			])
			.addField('Statistics', [
				`**<:listordered:848777308794126346> Role Count:** ${roles.length}`,
				`**<:listordered:848777308794126346> Emoji Count:** ${emojis.size}`,
				`**<:listordered:848777308794126346> Member Count:** ${msg.guild.memberCount}`,
				`**<:user1:848729325980876842> Humans:** ${
					members.filter((member) => !member.user.bot).size
				}`,
				`**<:robotfill:848737114287636480> Bots:** ${
					members.filter((member) => member.user.bot).size
				}`,
				`**<:text:848777804601491489> Text Channels:** ${
					channels.filter((channel) => channel.type === 'text').size
				}`,
				`**<:micfill:848778033112023071> Voice Channels:** ${
					channels.filter((channel) => channel.type === 'voice').size
				}`,
				`**<:filelist3fill:848778281133146122> Category Channels:** ${
					channels.filter((channel) => channel.type === 'category').size
				}`,
				`**<:newspaperfill:848778555705393152> News Channels:** ${
					channels.filter((channel) => channel.type === 'news').size
				}`,
				`**<:building3fill:848778788841193493> Stage Channels:** ${
					channels.filter((channel) => channel.type === 'stage').size
				}`,
				`**<:arrowrightupfill:848779032966856704> Boost Count:** ${
					msg.guild.premiumSubscriptionCount ?? '0'
				}`,
			])
			.setTimestamp();

		return msg.say(embed);
	}
};
