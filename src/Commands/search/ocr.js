const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');

module.exports = class OCRCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ocr',
			aliases: ['optical-character-recognition'],
			group: 'search',
			memberName: 'ocr',
			description: 'Lists the text in an image.',
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'image',
					prompt: 'What image would you like to search?',
					type: 'image',
				},
			],
			throttling: {
				usages: 2,
				duration: 60,
			},
		});
	}

	async run(msg, { image }) {
		try {
			const { body } = await request
				.post('https://api.ocr.space/parse/image')
				.set({ apiKey: process.env.OCR_KEY })
				.attach({ url: image });
			const data = body.ParsedResults[0].ParsedText;

			if (data.length === 0) return msg.say("Couldn't find any text.");

			const embed = new MessageEmbed()
				.setImage(image)
				.setColor('RANDOM')
				.setDescription(data)
				.setFooter(
					`Requested by ${msg.author.tag}`,
					msg.author.displayAvatarURL({ dynamic: true }),
				)
				.setTimestamp();

			return msg.embed(embed);
		} catch (err) {
			return msg.reply(`An error occured: \`${err.message}\`.`);
		}
	}
};
