const { formatNumber, embedURL } = require('../../Structures/Util');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const moment = require('moment');

module.exports = class StackOverflowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'stack-overflow',
			aliases: ['stackoverflow'],
			group: 'search',
			memberName: 'stack-overflow',
			description: 'Searches Stack Overflow for your query.',
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'query',
					prompt: 'What question would you like to search for?',
					type: 'string',
				},
			],
		});
	}

	async run(msg, { query }) {
		try {
			const { body } = await request.get('https://api.stackexchange.com/2.2/search/advanced').query({
				page: 1,
				pagesize: 1,
				order: 'asc',
				sort: 'relevance',
				answers: 1,
				q: query,
				site: 'stackoverflow',
				key: process.env.STACKOVERFLOW_KEY,
			});

			if (!body.items.length) return msg.say("Couldn't find any results.");

			const data = body.items[0];
			const embed = new MessageEmbed()
				.setColor('#f18025')
				.setAuthor(
					'Stack Overflow',
					'https://i.imgur.com/pRSu2vj.png',
					'https://stackoverflow.com',
				)
				.setURL(data.link)
				.setTitle(data.title)
				.addField('❯ ID', data.question_id, true)
				.addField('❯ Asker', embedURL(data.owner.display_name, data.owner.link), true)
				.addField('❯ Views', formatNumber(data.view_count), true)
				.addField('❯ Score', formatNumber(data.score), true)
				.addField(
					'❯ Creation Date',
					moment.utc(data.creation_date * 1000).format('MM/DD/YYYY h:mm A'),
					true,
				)
				.addField(
					'❯ Last Activity',
					moment.utc(data.last_activity_date * 1000).format('MM/DD/YYYY h:mm A'),
					true,
				);

			return msg.embed(embed);
		} catch (err) {
			return msg.reply(`An error occured: \`${err.message}\`.`);
		}
	}
};
