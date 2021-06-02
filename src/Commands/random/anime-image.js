const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class BirdCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'anime-image',
			aliases: ['random-anime-image', 'anime-img', 'random-anime-img'],
			group: 'random',
			memberName: 'anime-image',
			description: 'Responds with a random anime image.',
			clientPermissions: ['EMBED_LINKS'],
			nsfw: true,
			throttling: {
				usages: 5,
				duration: 15,
			},
		});
	}

	async run(msg) {
		const message = await msg.embed({ description: 'Fetching....' });

		const { url } = await this.client.request('/api/anime', 'json', 'get');

		const embed = new MessageEmbed()
			.setImage(url)
			.setFooter(
				`Requested by ${msg.author.tag}`,
				msg.author.displayAvatarURL({ dynamic: true, size: 4096 }),
			)
			.setColor('RANDOM')
			.setTimestamp();

		return message.edit(embed);
	}
};
