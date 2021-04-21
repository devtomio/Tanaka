/* eslint-disable no-negated-condition */
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class QueueCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'queue',
			aliases: ['music-queue', 'q'],
			group: 'music',
			memberName: 'queue',
			description: 'Shows the music queue.',
			guildOnly: true,
			args: [
				{
					key: 'page',
					prompt: 'What is the page of the queue?',
					type: 'integer',
					default: 1,
				},
			],
		});
	}

	run(message, { page }) {
		const player = this.client.manager.get(message.guild.id);
		if (!player) return message.reply('There is no player for this guild.');

		const { queue } = player;
		const embed = new MessageEmbed().setAuthor(`Queue for ${message.guild.name}`).setColor('RANDOM');

		const multiple = 10;

		const end = page * multiple;
		const start = end - multiple;

		const tracks = queue.slice(start, end);

		if (queue.current) embed.addField('Current', `[${queue.current.title}](${queue.current.uri})`);

		if (!tracks.length) embed.setDescription(`No tracks in ${page > 1 ? `page ${page}` : 'the queue'}.`);
		else
			embed.setDescription(
				tracks.map((track, i) => `${start + ++i} - [${track.title}](${track.uri})`).join('\n'),
			);

		const maxPages = Math.ceil(queue.length / multiple);

		embed.setFooter(`Page ${page > maxPages ? maxPages : page} of ${maxPages}`);

		return message.reply(embed);
	}
};
