const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');

module.exports = class AdviceCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'advice',
			aliases: ['random-advice'],
			group: 'random',
			memberName: 'advice',
			description: 'Responds with a random advice.',
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
			.get('https://api.adviceslip.com/advice')
			.set({ 'User-Agent': 'TanakaBot 1.0.0 (https://github.com/1chiSensei/Tanaka)' });

		const data = JSON.parse(body);

		const embed = new MessageEmbed()
			.setDescription(`\`\`\`\n${data.slip.advice}\n\`\`\``)
			.setFooter(
				`Requested by ${msg.author.tag}`,
				msg.author.displayAvatarURL({ dynamic: true, size: 4096 }),
			)
			.setColor('RANDOM')
			.setTimestamp();

		return message.edit(embed);
	}
};
