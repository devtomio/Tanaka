const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const { MessageEmbed } = require('discord.js');

module.exports = class AcceptCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'accept',
			memberName: 'accept',
			group: 'bots',
			description: 'Accepts a bot.',
			details: "This command only works on the bot's support server.",
			guildOnly: true,
			hidden: true,
			userPermissions: ['MANAGE_GUILD'],
			args: [
				{
					key: 'bot',
					prompt: 'Who is the bot that you want to accept?',
					type: 'user',
				},
				{
					key: 'remarks',
					prompt: 'Any remarks that you want to add?',
					type: 'string',
					default: 'None.',
				},
			],
		});
	}

	async run(msg, { bot, remarks }) {
		if (msg.guild.id !== '847462772584480778') return msg.reply("You can't use this command here.");
		if (!bot.bot) return msg.reply('That user is not a bot.');

		const data = await this.client.db.get(`bots-${bot.id}`);

		if (!data) return msg.reply('That bot is not in the queue.');

		const embed = new MessageEmbed()
			.setTitle('A bot has been accepted!')
			.setDescription(
				stripIndents`
				**Bot:** ${bot.tag}
				**Remarks:** ${remarks}
				**Accepter:** ${msg.author.tag}
			`,
			)
			.setThumbnail(bot.displayAvatarURL({ size: 4096 }))
			.setFooter('Your bot will be added shortly.')
			.setColor('RANDOM')
			.setTimestamp();

		await this.client.bots.send(`<@${data.ownerID}>`, { embeds: [embed] });

		return msg.say(`The bot **${bot.tag}** has been accepted.`);
	}
};
