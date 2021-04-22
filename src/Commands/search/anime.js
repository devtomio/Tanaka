const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const mal = require('mal-scraper');

module.exports = class AnimeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'anime',
			aliases: ['anime-search'],
			group: 'search',
			memberName: 'anime',
			description: 'Searches MyAnimeList for the anime that you give.',
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'anime',
					prompt: 'What is your query?',
					type: 'string',
				},
			],
			throttling: {
				usages: 5,
				duration: 15,
			},
		});
	}

	async run(msg, { anime }) {
		const message = await msg.embed({ description: 'Fetching....' });

		try {
			const result = await mal.getInfoFromName(anime);

			if (result.rating === 'Rx - Hentai' && !msg.channel.nsfw && msg.guild)
				return message.edit({
					embed: {
						description:
							"The anime you're searching for is marked NSFW. Please try again in a NSFW Channel.",
					},
				});

			const embed = new MessageEmbed()
				.setAuthor('MyAnimeList', 'https://i.imgur.com/pevEvk9.png', 'https://myanimelist.net')
				.setTitle(result.title)
				.setDescription(result.synopsis || 'No Synopsis')
				.setThumbnail(result.picture || '')
				.addField('❯ Trailer', result.trailer || 'No Trailer', true)
				.addField('❯ English Title', result.englishTitle || 'None', true)
				.addField('❯ Type', result.type, true)
				.addField('❯ Episodes', result.episodes || '0', true)
				.addField('❯ Status', result.status || 'Unknown', true)
				.addField('❯ Aired', result.aired || 'Unknown', true)
				.addField('❯ Premiered', result.premiered || 'Unknown', true)
				.addField('❯ Source', result.source || 'Unknown', true)
				.addField('❯ Duration', result.duration || 'Unknown', true)
				.addField('❯ Rating', result.rating || 'Unknown', true)
				.addField('❯ Rank', result.ranked || 'Unknown', true)
				.addField('❯ Popularity', result.popularity || 'Unknown', true)
				.setFooter(result.genres.join(', ') || 'No Genres')
				.setColor('#2e51a2')
				.setURL(result.url)
				.setTimestamp();

			return message.edit(embed);
		} catch {
			return message.edit({ embed: { description: 'No results can be found.' } });
		}
	}
};
