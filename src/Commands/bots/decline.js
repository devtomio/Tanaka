const Command = require('../../Structures/Command');
const { stripIndents } = require('common-tags');
const { MessageEmbed } = require('discord.js');

module.exports = class DeclineCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'decline',
			memberName: 'decline',
			group: 'bots',
			description: 'Declines a bot.',
			details: "This command only works on the bot's support server.",
			guildOnly: true,
			hidden: true,
			clientPermissions: ['KICK_MEMBERS'],
			userPermissions: ['MANAGE_GUILD'],
			args: [
				{
					key: 'bot',
					prompt: 'Who is the bot that you want to decline?',
					type: 'user',
				},
				{
					key: 'reason',
					prompt: 'What is the reason?',
					type: 'string',
					default: 'No reason provided. Please contact the person that declined this bot.',
				},
			],
		});
	}

	async run(msg, { bot, reason }) {
		if (msg.guild.id !== '847462772584480778') return msg.reply("You can't use this command here.");
		if (!bot.bot) return msg.reply('That user is not a bot.');

		const data = await this.client.db.get(`bots-${bot.id}`);

		if (!data) return msg.reply('That bot is not in the queue.');

		const embed = new MessageEmbed()
			.setTitle('A bot has been declined...')
			.setDescription(
				stripIndents`
				**Bot:** ${bot.tag}
				**Reason:** ${reason}
				**Decliner:** ${msg.author.tag}
			`,
			)
			.setThumbnail(bot.displayAvatarURL({ size: 4096 }))
			.setFooter('You can always re-add your bot!')
			.setColor('RANDOM')
			.setTimestamp();

		await this.client.bots.send(`<@${data.ownerID}>`, { embeds: [embed] });
		await this.client.db.delete(`bots-${bot.id}`);
		await msg.guild.members.kick(bot, reason);

		return msg.say(`The bot **${bot.tag}** has been declined for **${reason}**.`);
	}
};
