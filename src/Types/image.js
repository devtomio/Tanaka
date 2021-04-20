const { ArgumentType } = require('discord.js-commando');
const fileTypeRe = /\.(jpe?g|png|gif|jfif|bmp)$/i;
const request = require('node-superfetch');

module.exports = class ImageType extends ArgumentType {
	constructor(client) {
		super(client, 'image');
	}

	/**
	 * @param {string} value
	 * @param {import('discord.js-commando').CommandoMessage} msg
	 * @param {import('discord.js-commando').Argument} arg
	 */
	async validate(value, msg, arg) {
		const attachment = msg.attachments.first();

		if (attachment) {
			if (attachment.size > 8e6) return 'Please provide an image under 8 MB.';
			if (!fileTypeRe.test(attachment.name))
				return 'Please only send PNG, JPG, BMP, or GIF formatted images.';

			return true;
		}
		if (fileTypeRe.test(value.toLowerCase())) {
			try {
				await request.get(value);

				return true;
			} catch {
				return false;
			}
		}

		return this.client.registry.types.get('user').validate(value, msg, arg);
	}

	/**
	 * @param {string} value
	 * @param {import('discord.js-commando').CommandoMessage} msg
	 * @param {import('discord.js-commando').Argument} arg
	 */
	async parse(value, msg, arg) {
		const attachment = msg.attachments.first();

		if (attachment) return attachment.url;
		if (fileTypeRe.test(value.toLowerCase())) return value;

		const user = await this.client.registry.types.get('user').parse(value, msg, arg);

		return user.displayAvatarURL({ format: 'png', size: 4096 });
	}

	/**
	 * @param {string} value
	 * @param {import('discord.js-commando').CommandoMessage} msg
	 * @param {import('discord.js-commando').Argument} arg
	 */
	isEmpty(value, msg, arg) {
		if (msg.attachments.size) return false;

		return this.client.registry.types.get('user').isEmpty(value, msg, arg);
	}
};
