const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			aliases: ['latency'],
			group: 'util',
			memberName: 'ping',
			guarded: true,
			description: 'Shows you the latency of the bot and the database.',
			clientPermissions: ['EMBED_LINKS'],
		});
	}

	async run(msg) {
		const message = await msg.say('Pinging....');

		const latency = message.createdTimestamp - msg.createdTimestamp;
		const db = await this.client.db.fetchLatency();

		const embed = new MessageEmbed()
			.addField(
				'Bot',
				[`**❯ WebSocket:** \`${this.client.ws.ping}ms\``, `**❯ Message:** \`${latency}ms\``, '\u200b'].join(
					'\n',
				),
			)
			.addField(
				'Database',
				[
					`**❯ Read:** \`${db.read}ms\``,
					`**❯ Write:** \`${db.write}ms\``,
					`**❯ Average:** \`${db.average}ms\``,
				].join('\n'),
			)
			.setColor('RANDOM')
			.setFooter(
				`Requested by ${msg.author.tag}`,
				msg.author.displayAvatarURL({ dynamic: true, size: 4096 }),
			)
			.setThumbnail(this.client.user.displayAvatarURL({ size: 4096 }))
			.setTimestamp();

		return msg.say(embed);
	}
};
