const { Command } = require('discord.js-commando');
const { getImage } = require('random-reddit');

module.exports = class AttackOnTitanCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'attack-on-titan',
			aliases: ['attackontitan', 'aot', 'shingekinokyojin', '進撃の巨人'],
			group: 'anime',
			memberName: 'attack-on-titan',
			description: 'Sends a random Attack on Titan image.',
		});
	}

	async run(msg) {
		msg.channel.startTyping();

		const img = await getImage(['attackontitan', 'attackontitanmemes', 'ShingekiNoKyojin'], Infinity);

		msg.channel.stopTyping();

		return msg.say({ files: [{ attachment: img, name: 'death-note.png' }] });
	}
};
