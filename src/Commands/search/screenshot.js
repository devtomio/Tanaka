const { screenshot } = require('../../Structures/Puppeteer');
const { isUrl } = require('../../Structures/Util');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const url = require('url');

module.exports = class ScreenshotCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'screenshot',
			aliases: ['ss'],
			memberName: 'screenshot',
			group: 'search',
			description: 'Screenshots a website.',
			throttling: {
				usages: 2,
				duration: 60,
			},
			args: [
				{
					key: 'link',
					prompt: 'What is the link of the website?',
					type: 'string',
					validate: (m) => isUrl(m),
				},
			],
		});

		this.nsfwList = null;
	}

	async run(msg, { link }) {
		try {
			msg.channel.startTyping();

			if (!this.nsfwList) await this.fetchNSFWList();

			const parsed = url.parse(link);

			if (this.nsfwList.some((nsfwURL) => parsed.host === nsfwURL) && !msg.channel.nsfw)
				return msg.reply('This site is NSFW. Please try again in a NSFW channel.');

			const { buffer, title } = await screenshot(link);

			const embed = new MessageEmbed()
				.attachFiles([{ attachment: buffer, name: 'screenshot.png' }])
				.setTitle(title)
				.setImage('attachment://screenshot.png')
				.setColor('RANDOM')
				.setFooter(
					`Requested by ${msg.author.tag}`,
					msg.author.displayAvatarURL({ dynamic: true }),
				)
				.setTimestamp();

			msg.say(embed);

			return msg.channel.stopTyping();
		} catch (e) {
			msg.reply("Couldn't find any results. Invalid URL?");

			return msg.channel.stopTyping();
		}
	}

	async fetchNSFWList(force = false) {
		if (!force && this.nsfwList) return this.nsfwList;

		const { text } = await request.get('https://blocklistproject.github.io/Lists/alt-version/porn-nl.txt');

		this.nsfwList = text
			.split('\n')
			.filter((site) => site && !site.startsWith('#'))
			.map((site) => site.replace(/^(0.0.0.0)/, ''));

		return this.nsfwList;
	}
};
