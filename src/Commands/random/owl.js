const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');

module.exports = class OwlCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'owl',
			aliases: ['random-owl'],
			group: 'random',
			memberName: 'owl',
			description: 'Responds with a random owl image.',
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
			.get('https://pics.floofybot.moe/owl')
			.set({ 'User-Agent': 'TanakaBot (https://github.com/1chiSensei/Tanaka)' });

		const embed = new MessageEmbed()
			.setImage(body.image)
			.setFooter(
				`Requested by ${msg.author.tag}`,
				msg.author.displayAvatarURL({ dynamic: true, size: 4096 }),
			)
			.setColor('RANDOM')
			.setTimestamp();

		return message.edit(embed);
	}
};
