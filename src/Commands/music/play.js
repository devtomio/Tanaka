const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class PlayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'play',
			aliases: ['play-music', 'p'],
			group: 'music',
			memberName: 'play',
			description: "Add's music to the music queue.",
			guildOnly: true,
			args: [
				{
					key: 'title',
					prompt: 'What is the title of the music?',
					type: 'string',
				},
			],
		});
	}

	async run(msg, { title }) {
		const { channel } = msg.member.voice;

		if (!channel) return msg.reply('You need to join a voice channel!');

		const player = this.client.manager.create({
			guild: msg.guild.id,
			voiceChannel: channel.id,
			textChannel: msg.channel.id,
			selfDeafen: true,
		});

		if (player.state !== 'CONNECTED') player.connect();

		let res;

		try {
			res = await player.search(title, msg.author);

			if (res.loadType === 'LOAD_FAILED') {
				if (!player.queue.current) player.destroy();

				throw res.exception;
			}
		} catch (err) {
			return msg.reply(`There was an error while searching: ${err.message}.`);
		}

		switch (res.loadType) {
			case 'NO_MATCHES':
				if (!player.queue.current) player.destroy();

				return msg.reply('There were no results found.');
			case 'TRACK_LOADED': {
				player.queue.add(res.tracks[0]);

				const track = res.tracks[0];

				if (!player.playing && !player.paused && !player.queue.size) player.play();

				const embed = new MessageEmbed()
					.setTitle(`**Adding to queue: __${track.title}__**`)
					.setURL(track.uri)
					.setImage(track.thumbnail || '')
					.setAuthor(track.author)
					.setColor('RANDOM')
					.setFooter(`Requested by: ${track.requester.tag}`)
					.setTimestamp();

				return msg.reply(embed);
			}
			case 'PLAYLIST_LOADED':
				player.queue.add(res.tracks);

				if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length)
					player.play();

				return msg.reply(
					`Queuing playlist \`${res.playlist.name}\` with ${res.tracks.length} tracks.`,
				);
			case 'SEARCH_RESULT': {
				let max = 5;
				let collected;
				const filter = (m) => m.author.id === msg.author.id && /^(\d+|end)$/i.test(m.content);

				if (res.tracks.length < max) max = res.tracks.length;

				const results = `Reply with a number.\n${res.tracks
					.slice(0, max)
					.map((track, index) => `${++index} - \`${track.title}\``)
					.join('\n')}`;

				msg.say(results);

				try {
					collected = await msg.channel.awaitMessages(filter, {
						max: 1,
						time: 30e3,
						errors: ['time'],
					});
				} catch (e) {
					if (!player.queue.current) player.destroy();

					return msg.reply("You didn't provide a selection.");
				}

				const first = collected.first().content;

				if (first.toLowerCase() === 'end') {
					if (!player.queue.current) player.destroy();

					return msg.say('Cancelled selection.');
				}

				const index = Number(first) - 1;

				if (index < 0 || index > max - 1)
					return msg.say(`The number you provided is too small or too big (1-${max}).`);

				const track = res.tracks[index];
				player.queue.add(track);

				if (!player.playing && !player.paused && !player.queue.size) player.play();

				const embed = new MessageEmbed()
					.setTitle(`**Adding to queue: __${track.title}__**`)
					.setURL(track.uri)
					.setImage(track.thumbnail || '')
					.setAuthor(track.author)
					.setColor('RANDOM')
					.setFooter(`Requested by: ${track.requester.tag}`)
					.setTimestamp();

				return msg.reply(embed);
			}
		}
	}
};
