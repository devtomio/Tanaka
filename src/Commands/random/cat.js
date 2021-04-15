const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');

module.exports = class CatCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'cat',
			aliases: ['random-cat'],
			group: 'random',
			memberName: 'cat',
			description: 'Responds with a random cat image.',
			clientPermissions: ['EMBED_LINKS'],
			throttling: {
				usages: 5,
				duration: 15,
			},
		});
	}

	async run(msg) {
		const message = await msg.embed({ description: 'Fetching....' });

		const { body } = await request
			.get('https://cataas.com/cat?json=true')
			.set({ 'User-Agent': 'TanakaBot 1.0.0 (https://github.com/1chiSensei/Tanaka)' });

		const embed = new MessageEmbed()
			.setImage(`https://catass.com${body.url}`)
			.setFooter(
				`Requested by ${msg.author.tag}`,
				msg.author.displayAvatarURL({ dynamic: true, size: 4096 }),
			)
			.setColor('RANDOM')
			.setTimestamp();

		return message.edit(embed);
	}
};
