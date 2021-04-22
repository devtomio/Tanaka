const { isUrl } = require('../../Structures/Util');
const { Command } = require('discord.js-commando');
const request = require('node-superfetch');
const WebShot = require('websshot');
const window = new WebShot(
	{ removeTags: [], removeAttributes: [], args: [], height: 800, width: 1280 },
	{ args: ['--no-sandbox'], headless: true },
);
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
			if (!this.nsfwList) await this.fetchNSFWList();

			const parsed = url.parse(link);

			if (this.nsfwList.some((nsfwURL) => parsed.host === nsfwURL) && !msg.channel.nsfw)
				return msg.reply('This site is NSFW. Please try again in a NSFW channel.');

			const attachment = await window.screenshot(link);

			return msg.say({ files: [{ attachment, name: 'screenshot.png' }] });
		} catch {
			return msg.reply("Couldn't find any results. Invalid URL?");
		}
	}

	async fetchNSFWList(force = false) {
		if (!force && this.nsfwList) return this.nsfwList;

		const { text } = await request.get('https://github.com/blocklistproject/Lists/raw/master/porn.txt');

		this.nsfwList = text
			.split('\n')
			.filter((site) => site && !site.startsWith('#'))
			.map((site) => site.replace(/^(0.0.0.0)/, ''));

		return this.nsfwList;
	}
};
