const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch').default;

module.exports = class WebsiteStatusCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'website-status',
			aliases: ['web-status'],
			memberName: 'website-status',
			group: 'other',
			description: 'Shows the status of a website.',
			args: [
				{
					key: 'site',
					prompt: 'What is the website that you wanna get the status of?',
					type: 'string',
					parse: (site) => (/^(https?:\/\/)/i.test(site) ? site : `http://${site}`),
				},
			],
		});
	}

	async run(msg, { site }) {
		try {
			const data = await fetch(site);
			const uri = data.url.replace('http://', '').replace('https://', '').replace('%27s', '');
			const embed = new MessageEmbed()
				.setTitle(uri)
				.setDescription(`${data.status} - ${data.statusText}`)
				.setFooter(
					`Requested by ${msg.author.tag}`,
					msg.author.displayAvatarURL({ dynamic: true, size: 4096 }),
				)
				.setColor('RANDOM')
				.setTimestamp();

			return msg.embed(embed);
		} catch {
			return msg.reply("That website doesn't seem to exist...");
		}
	}
};
