const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');

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
					parse: (query) => query.replaceAll('#', '.prototype.'),
				},
			],
		});
	}

	async run(msg, { query }) {
		try {
			const { body } = await request.get('https://developer.mozilla.org/api/v1/search').query({
				q: query,
				locale: 'en-US',
				highlight: false,
			});

			if (!body.documents.length) return msg.say("Couldn't find any results.");

			const data = body.documents[0];
			const embed = new MessageEmbed()
				.setColor('#0881ba')
				.setAuthor('MDN', 'https://i.imgur.com/f0uC4b8.png', 'https://developer.mozilla.org')
				.setURL(`https://developer.mozilla.org${data.mdn_url}`)
				.setTitle(data.title)
				.setDescription(data.summary);

			return msg.embed(embed);
		} catch (err) {
			return msg.reply(`An error occured: \`${err.message}\`.`);
		}
	}
};
