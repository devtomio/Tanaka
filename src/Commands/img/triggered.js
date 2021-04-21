const { Command } = require('discord.js-commando');
const { Canvas } = require('canvacord');

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
			const attachment = await Canvas.trigger(image);

			return msg.say({ files: [{ attachment, name: 'triggered.gif' }] });
		} catch (err) {
			return msg.reply(`An error occured: \`${err.message}\`.`);
		}
	}
};
