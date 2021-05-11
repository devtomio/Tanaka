const { isUrl, shorten } = require('../../Structures/Util');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');

module.exports = class HeadersCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'headers',
			memberName: 'headers',
			group: 'search',
			description: 'Gets the headers of a website.',
			args: [
				{
					key: 'site',
					prompt: 'What is the url of the website?',
					type: 'string',
					validate: (site) => isUrl(site),
				},
			],
		});
	}

	async run(msg, { site }) {
		try {
			const { headers } = await request.get(site);
			const headerArr = [];
			const embed = new MessageEmbed()
				.setColor('RANDOM')
				.setTimestamp()
				.setFooter(
					`Requested by ${msg.author.tag}`,
					msg.author.displayAvatarURL({ dynamic: true }),
				);

			for (const [key, value] of Object.entries(headers)) {
				if (!headerArr.length >= 15) continue;

				headerArr.push({ key, value });
			}
			for (const header of headerArr) {
				if (!headerArr.length >= 15) continue;

				embed.addField(
					header.key,
					header.value.length === 0 ? 'empty' : shorten(header.value, 1000),
				);
			}

			return msg.embed(embed);
		} catch (err) {
			if (err.status === 404) return msg.say("Couldn't find the website.");

			return msg.reply(`An error occured: \`${err.message}\`.`);
		}
	}
};
