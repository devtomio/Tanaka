const { isUrlSafe, isUrl } = require('../../Structures/Util');
const { MessageAttachment } = require('discord.js');
const { Command } = require('discord.js-commando');
const WebShot = require('websshot');
const window = new WebShot(
	{ removeTags: [], removeAttributes: [], args: [], height: 800, width: 1280 },
	{ args: ['--no-sandbox'] },
);

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
	}

	async run(msg, { link }) {
		const safe = await isUrlSafe(link);

		if (!safe && !msg.channel.nsfw && msg.guild)
			return msg.say(
				'The URL you provided is an unsafe website. Use this on a NSFW channel instead.',
			);

		const img = await window.screenshot(link);
		const image = new MessageAttachment(img);

		return msg.say(image);
	}
};
