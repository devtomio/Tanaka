const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');

module.exports = class SadCatCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'sadcat',
			aliases: ['random-sadcat', 'sad-cat'],
			group: 'random',
			memberName: 'cat',
			description: 'Responds with a random sad cat image.',
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
			.get('https://api.alexflipnote.dev/sadcat')
			.set({ 'User-Agent': 'TanakaBot (https://github.com/1chiSensei/Tanaka)' });

		const embed = new MessageEmbed()
			.setImage(body.file)
			.setFooter(
				`Requested by ${msg.author.tag}`,
				msg.author.displayAvatarURL({ dynamic: true, size: 4096 }),
			)
			.setColor('RANDOM')
			.setTimestamp();

		return message.edit(embed);
	}
};
