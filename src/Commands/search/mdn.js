const { searchMdn } = require('../../Structures/Util');
const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class MDNCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'mdn',
			group: 'search',
			memberName: 'mdn',
			description: 'Searches MDN for your query.',
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'query',
					prompt: 'What article would you like to search for?',
					type: 'string',
				},
			],
		});
	}

	async run(msg, { query }) {
		const docs = await searchMdn(query);

		if (!docs) return msg.reply("I couldn't find anything for that.");

		const match = docs[0].diff === 1;

		if (!match) {
			let str = '';
			let idx = 0;

			for (const doc of docs) {
				const link = this.makeMdnLink(doc.slug);

				str += `\`#${`${++idx}`.padStart(2, '0')}\` **[${doc.title}](${link})**\n`;
			}

			const embed = new MessageEmbed()
				.setColor('#0881ba')
				.setAuthor('MDN', 'https://i.imgur.com/f0uC4b8.png', 'https://developer.mozilla.org')
				.setDescription(str);

			return msg.say(embed);
		}

		const doc = docs[0];
		const embed = new MessageEmbed()
			.setColor('#0881ba')
			.setAuthor('MDN', 'https://i.imgur.com/f0uC4b8.png', 'https://developer.mozilla.org')
			.setTitle(doc.title)
			.setURL(this.makeMdnLink(doc.slug))
			.setDescription(this.client.converter.turndown(doc.summary));

		return msg.say(embed);
	}

	makeMdnLink(slug) {
		return `https://developer.mozilla.org/en-US/docs/${slug.replace(/^\//m, '')}`;
	}
};
