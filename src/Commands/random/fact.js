const { Command } = require('discord.js-commando');
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
		});
	}

	async run(msg) {
		const message = await msg.say('Fetching....');

		const { body } = await request
			.get('https://api.1chi.tk/fact')
			.set({ 'User-Agent': 'TanakaBot 1.0.0 (https://github.com/1chiSensei/Tanaka)' });

		const embed = new MessageEmbed()
			.setDescription(`\`\`\`${body.fact}\`\`\``)
			.setFooter(
				`Requested by ${msg.author.tag}`,
				msg.author.displayAvatarURL({ dynamic: true, size: 4096 }),
			)
			.setTimestamp();

		return message.edit(embed);
	}
};
