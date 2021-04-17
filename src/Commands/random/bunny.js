const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');

module.exports = class BunnyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'bunny',
			aliases: ['random-bunny'],
			group: 'random',
			memberName: 'bunny',
			description: 'Responds with a random bunny image.',
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
			.get('https://api.bunnies.io/v2/loop/random/?media=gif,png')
			.set({ 'User-Agent': 'TanakaBot (https://github.com/1chiSensei/Tanaka)' });

		const embed = new MessageEmbed()
			.setImage(body.media.poster)
			.setFooter(
				`Requested by ${msg.author.tag}`,
				msg.author.displayAvatarURL({ dynamic: true, size: 4096 }),
			)
			.setColor('RANDOM')
			.setTimestamp();

		return message.edit(embed);
	}
};
