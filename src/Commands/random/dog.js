const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');

module.exports = class DogCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'dog',
			aliases: ['random-dog'],
			group: 'random',
			memberName: 'dog',
			description: 'Responds with a random dog image.',
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
			.get('https://dog.ceo/api/breeds/image/random')
			.set({ 'User-Agent': 'TanakaBot 1.0.0 (https://github.com/1chiSensei/Tanaka)' });

		const embed = new MessageEmbed()
			.setImage(body.message)
			.setFooter(
				`Requested by ${msg.author.tag}`,
				msg.author.displayAvatarURL({ dynamic: true, size: 4096 }),
			)
			.setColor('RANDOM')
			.setTimestamp();

		return message.edit(embed);
	}
};
