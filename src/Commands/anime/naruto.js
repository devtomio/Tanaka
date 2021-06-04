const Command = require('../../Structures/Command');
const { getImage } = require('random-reddit');

module.exports = class NarutoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'naruto',
			aliases: ['ナルト'],
			group: 'anime',
			memberName: 'naruto',
			description: 'Sends a random Naruto image.',
		});
	}

	async run(msg) {
		msg.channel.startTyping();

		const img = await getImage(['Naruto', 'dankruto', 'narutomemes'], Infinity);

		msg.channel.stopTyping();

		return msg.say({ files: [{ attachment: img, name: 'naruto.png' }] });
	}
};
