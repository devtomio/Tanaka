const { Command } = require('discord.js-commando');

module.exports = class StopCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'stop',
			aliases: ['stop-music', 's'],
			group: 'music',
			memberName: 'stop',
			description: 'Stops the music queue.',
			guildOnly: true,
		});
	}

	run(msg) {
		const player = this.client.manager.get(msg.guild.id);
		if (!player) return msg.reply('There is no player for this guild.');

		const { channel } = msg.member.voice;

		if (!channel) return msg.reply('You need to join a voice channel.');
		if (channel.id !== player.voiceChannel) return msg.reply("You're not in the same voice channel as me!");

		player.destroy();
		return msg.reply('Stopped the player.');
	}
};
