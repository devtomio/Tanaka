const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');

module.exports = class MonkeyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'monkey',
			aliases: ['random-monkey', 'monke'],
			group: 'random',
			memberName: 'monkey',
			description: 'Responds with a random monkey image.',
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
			.get('https://api.monke.vip/attachments/monkey')
			.query('key', process.env.MONKE_KEY)
			.set({ 'User-Agent': 'TanakaBot 1.0.0 (https://github.com/1chiSensei/Tanaka)' });

		const embed = new MessageEmbed()
			.setImage(body.url)
			.setFooter(
				`Requested by ${msg.author.tag}`,
				msg.author.displayAvatarURL({ dynamic: true, size: 4096 }),
			)
			.setColor('RANDOM')
			.setTimestamp();

		return message.edit(embed);
	}
};
