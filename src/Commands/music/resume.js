const { Command } = require('discord.js-commando');

module.exports = class ResumeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'resume',
			aliases: ['resume-music'],
			group: 'music',
			memberName: 'resumes',
			description: 'Resumes the music queue.',
			guildOnly: true,
		});
	}

	run(msg) {
		const player = this.client.manager.get(msg.guild.id);
		if (!player) return msg.reply('There is no player for this guild.');

		const { channel } = msg.member.voice;

		if (!channel) return msg.reply('You need to join a voice channel.');
		if (channel.id !== player.voiceChannel) return msg.reply("You're not in the same voice channel as me!");
		if (!player.paused) return msg.reply('The queue is already resumed.');

		player.pause(false);
		return msg.reply('Resumed the player.');
	}
};
