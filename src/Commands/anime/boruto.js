const { Command } = require('discord.js-commando');
const { getImage } = require('random-reddit');

module.exports = class BorutoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'boruto',
			aliases: ['ボルト'],
			group: 'anime',
			memberName: 'boruto',
			description: 'Sends a random Boruto image.',
		});
	}

	async run(msg) {
		msg.channel.startTyping();

		const img = await getImage(['Boruto', 'BorutoMemes', 'BorutoSarada'], Infinity);

		msg.channel.stopTyping();

		return msg.say({ files: [{ attachment: img, name: 'naruto.png' }] });
	}
};
