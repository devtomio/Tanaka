const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');

module.exports = class FactCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'fact',
			aliases: ['random-fact'],
			group: 'random',
			memberName: 'fact',
			description: 'Responds with a random fact.',
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
			.get('https://uselessfacts.jsph.pl/random.json')
			.query({ language: 'en' })
			.set({ 'User-Agent': 'TanakaBot 1.0.0 (https://github.com/1chiSensei/Tanaka)' });

		const embed = new MessageEmbed()
			.setDescription(`\`\`\`\n${body.text}\n\`\`\``)
			.setFooter(
				`Requested by ${msg.author.tag}`,
				msg.author.displayAvatarURL({ dynamic: true, size: 4096 }),
			)
			.setColor('RANDOM')
			.setTimestamp();

		return message.edit(embed);
	}
};
