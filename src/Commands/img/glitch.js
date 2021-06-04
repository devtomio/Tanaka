const { distort } = require('../../Structures/Canvas');
const { createCanvas, loadImage } = require('canvas');
const { Command } = require('discord.js-commando');
const request = require('node-superfetch');

module.exports = class GlitchCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'glitch',
			group: 'img',
			memberName: 'glitch',
			description: 'Applies the glitch effect to an image.',
			throttling: {
				usages: 1,
				duration: 10,
			},
			clientPermissions: ['ATTACH_FILES'],
			args: [
				{
					key: 'image',
					prompt: 'What image would you like to edit?',
					type: 'image',
					default: (msg) => msg.author.displayAvatarURL({ format: 'png', size: 512 }),
				},
			],
		});
	}

	async run(msg, { image }) {
		try {
			msg.channel.startTyping();

			const { body } = await request.get(image);
			const data = await loadImage(body);
			const canvas = createCanvas(data.width, data.height);
			const ctx = canvas.getContext('2d');

			ctx.drawImage(data, 0, 0);
			distort(ctx, 20, 0, 0, data.width, data.height, 5);

			const attachment = canvas.toBuffer();

			if (Buffer.byteLength(attachment) > 8e6) return msg.reply('Resulting image was above 8 MB.');

			msg.channel.stopTyping();

			return msg.say({ files: [{ attachment, name: 'glitch.png' }] });
		} catch (err) {
			return msg.reply(`An error occured: \`${err.message}\`.`);
		}
	}
};
