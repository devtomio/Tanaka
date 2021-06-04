const Command = require('../../Structures/Command');
const { getImage } = require('random-reddit');

module.exports = class DeathNoteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'death-note',
			aliases: ['deathnote', 'デスノート'],
			group: 'anime',
			memberName: 'death-node',
			description: 'Sends a random Death Note image.',
		});
	}

	async run(msg) {
		msg.channel.startTyping();

		const img = await getImage('deathnote', Infinity);

		msg.channel.stopTyping();

		return msg.say({ files: [{ attachment: img, name: 'death-note.png' }] });
	}
};
