const { Command } = require('discord.js-commando');

module.exports = class SkipCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'skip',
			aliases: ['skip-music', 'sk'],
			group: 'music',
			memberName: 'skips',
			description: 'Skips the music queue.',
			guildOnly: true,
		});
	}

	run(msg) {
		const player = this.client.manager.get(msg.guild.id);
		if (!player) return msg.reply('There is no player for this guild.');

		const { channel } = msg.member.voice;

		if (!channel) return msg.reply('You need to join a voice channel.');
		if (channel.id !== player.voiceChannel) return msg.reply("You're not in the same voice channel as me!");
		if (!player.queue.current) return msg.reply('There is no music playing.');

		const { title } = player.queue.current;

		player.stop();
		return msg.reply(`${title} was skipped.`);
	}
};
