const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const cheerio = require('cheerio');

module.exports = class FMLCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'fml',
			aliases: ['fuck-my-life'],
			group: 'random',
			memberName: 'fml',
			description: 'Responds with a random FML quote.',
			clientPermissions: ['EMBED_LINKS'],
			throttling: {
				usages: 5,
				duration: 15,
			},
		});
	}

	async run(msg) {
		const message = await msg.embed({ description: 'Fetching....' });

		const { text } = await request
			.get('https://fmylife.com/random')
			.set({ 'User-Agent': 'TanakaBot 1.0.0 (https://github.com/1chiSensei/Tanaka)' });

		const $ = cheerio.load(text, { normalizeWhitespace: true });
		const fml = $('a.article-link').first().text().trim();

		const embed = new MessageEmbed()
			.setDescription(`\`\`\`\n${fml}\n\`\`\``)
			.setFooter(
				`Requested by ${msg.author.tag}`,
				msg.author.displayAvatarURL({ dynamic: true, size: 4096 }),
			)
			.setColor('RANDOM')
			.setTimestamp();

		return message.edit(embed);
	}
};
