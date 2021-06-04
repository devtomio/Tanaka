const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');

module.exports = class ShibaCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'shiba',
			aliases: ['random-shiba'],
			group: 'random',
			memberName: 'shiba',
			description: 'Responds with a random shiba inu image.',
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
			.get('https://shibe.online/api/shibes')
			.set({ 'User-Agent': 'TanakaBot 1.0.0 (https://github.com/1chiSensei/Tanaka)' });

		const embed = new MessageEmbed()
			.setImage(body[0])
			.setFooter(
				`Requested by ${msg.author.tag}`,
				msg.author.displayAvatarURL({ dynamic: true, size: 4096 }),
			)
			.setColor('RANDOM')
			.setTimestamp();

		return message.edit(embed);
	}
};
