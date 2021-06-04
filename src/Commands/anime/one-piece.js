const Command = require('../../Structures/Command');
const { getImage } = require('random-reddit');

module.exports = class OnePieceCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'one-piece',
			aliases: ['onepiece', 'ワンピース'],
			group: 'anime',
			memberName: 'one-piece',
			description: 'Sends a random One Piece image.',
		});
	}

	async run(msg) {
		msg.channel.startTyping();

		const img = await getImage('OnePiece', Infinity);

		msg.channel.stopTyping();

		return msg.say({ files: [{ attachment: img, name: 'one-piece.png' }] });
	}
};
