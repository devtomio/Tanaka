const { drawImageWithTint } = require('../../Structures/Canvas');
const { streamToArray } = require('../../Structures/Util');
const { createCanvas, loadImage } = require('canvas');
const { Command } = require('discord.js-commando');
const request = require('node-superfetch');
const GIFEncoder = require('gifencoder');
const path = require('path');

const coord1 = [-25, -33, -42, -14];
const coord2 = [-25, -13, -34, -10];

module.exports = class TriggeredCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'triggered',
			group: 'img',
			memberName: 'triggered',
			description: 'Applies the triggered effect to an image.',
			throttling: {
				usages: 1,
				duration: 30,
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
			const base = await loadImage(
				path.join(__dirname, '..', '..', 'Assets', 'image', 'triggered.png'),
			);
			const { body } = await request.get(image);
			const avatar = await loadImage(body);
			const encoder = new GIFEncoder(base.width, base.width);
			const canvas = createCanvas(base.width, base.width);
			const ctx = canvas.getContext('2d');

			ctx.fillStyle = 'white';
			ctx.fillRect(0, 0, base.width, base.width);

			const stream = encoder.createReadStream();

			encoder.start();
			encoder.setRepeat(0);
			encoder.setDelay(50);
			encoder.setQuality(200);

			for (let i = 0; i < 4; i++) {
				drawImageWithTint(ctx, avatar, 'red', coord1[i], coord2[i], 300, 300);
				ctx.drawImage(base, 0, 218, 256, 38);
				encoder.addFrame(ctx);
			}

			encoder.finish();

			const buffer = await streamToArray(stream);

			return msg.say({ files: [{ attachment: Buffer.concat(buffer), name: 'triggered.gif' }] });
		} catch (err) {
			return msg.reply(`An error occured: \`${err.message}\`.`);
		}
	}
};
