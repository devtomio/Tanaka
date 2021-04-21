const { createCanvas, loadImage } = require('canvas');
const { Command } = require('discord.js-commando');
const request = require('node-superfetch');
const GIFEncoder = require('gifencoder');
const path = require('path');

module.exports = class TriggeredCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'triggered',
			group: 'img',
			memberName: 'triggered',
			description: 'Applies the triggered effect to an image.',
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
			const { body } = await request.get(image);
			const base = await loadImage(
				path.join(__dirname, '..', '..', 'Assets', 'image', 'triggered.png'),
			);
			const img = await loadImage(body);
			const GIF = new GIFEncoder(256, 310);

			GIF.start();
			GIF.setRepeat(0);
			GIF.setDelay(15);

			const canvas = createCanvas(256, 310);
			const ctx = canvas.getContext('2d');
			const BR = 30;
			const LR = 20;

			let i = 0;

			while (i < 9) {
				ctx.clearRect(0, 0, 256, 310);
				ctx.drawImage(
					img,
					Math.floor(Math.random() * BR) - BR,
					Math.floor(Math.random() * BR) - BR,
					256 + BR,
					310 - 54 + BR,
				);
				ctx.fillStyle = '##FF000033';
				ctx.fillRect(0, 0, 256, 310);
				ctx.drawImage(
					base,
					Math.floor(Math.random() * LR) - LR,
					310 - 54 + Math.floor(Math.random() * LR) - LR,
					256 + LR,
					54 + LR,
				);

				GIF.addFrame(ctx);

				i++;
			}
			GIF.finish();

			const attachment = GIF.out.getData();

			if (Buffer.byteLength(attachment) > 8e6) return msg.reply('Resulting image was above 8 MB.');

			return msg.say({ files: [{ attachment, name: 'triggered.gif' }] });
		} catch (err) {
			return msg.reply(`An error occured: \`${err.message}\`.`);
		}
	}
};
