const Command = require('../../Structures/Command');
const { stripIndents } = require('common-tags');
const { MessageEmbed } = require('discord.js');

const ids = [
	'422087909634736160',
	'280497242714931202',
	'536991182035746816',
	'804605929944645672',
	'679379155590184966',
	'543645076862140419',
	'302050872383242240',
];
const guildIds = ['847462772584480778', '830047984573480970'];

module.exports = class AddBotCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'add-bot',
			aliases: ['addbot'],
			memberName: 'add-bot',
			group: 'bots',
			description: 'Adds a bot to the server.',
			details: "This command only works on the bot's support server.",
			guildOnly: true,
			hidden: true,
			args: [
				{
					key: 'bot',
					prompt: 'What is the id of the bot?',
					type: 'user',
				},
				{
					key: 'prefix',
					prompt: 'What is the prefix of the bot?',
					type: 'string',
				},
			],
		});
	}

	async run(msg, { bot, prefix }) {
		if (!guildIds.includes(msg.guild.id)) return msg.reply('You cant use this command here.');
		if (!bot.bot) return msg.reply('That user is not a bot.');
		if (ids.includes(bot.id)) return msg.reply("You can't add that bot.");

		const data = await this.client.db.get(`bots-${bot.id}`);

		if (data) return msg.reply('That bot is already in this server.');

		const embed = new MessageEmbed()
			.setTitle('A new bot has been added!')
			.setDescription(
				stripIndents`
				**Name:** ${bot.tag}
				**Owner:** ${msg.author.tag}
				**Prefix:** ${prefix}
				**Invite:** https://discord.com/oauth2/authorize?client_id=${bot.id}&permissions=0&scope=bot&guild_id=847462772584480778
			`,
			)
			.setThumbnail(bot.displayAvatarURL({ size: 4096 }))
			.setFooter('Testing this bot may take long, please wait')
			.setColor('RANDOM')
			.setTimestamp();

		await this.client.db.set(`bots-${bot.id}`, { ownerID: msg.author.id });
		await this.client.bots.send('<@&847446325783822347>', { embeds: [embed] });

		return msg.say(`Your bot **${bot.tag}** has been added to the queue.`);
	}
};
