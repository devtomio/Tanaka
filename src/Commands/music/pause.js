const { Command } = require('discord.js-commando');

module.exports = class PauseCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'pause',
			aliases: ['pause-music'],
			group: 'music',
			memberName: 'pause',
			description: 'Pauses the music queue.',
			guildOnly: true,
		});
	}

	run(msg) {
		const player = this.client.manager.get(msg.guild.id);
		if (!player) return msg.reply('There is no player for this guild.');

		const { channel } = msg.member.voice;

		if (!channel) return msg.reply('You need to join a voice channel.');
		if (channel.id !== player.voiceChannel) return msg.reply("You're not in the same voice channel as me!");
		if (player.paused) return msg.reply('The queue is already paused.');

		player.pause(true);
		return msg.reply('Stopped the player.');
	}
};
