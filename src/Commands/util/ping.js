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
				[`**❯ WebSocket:** ${this.client.ws.ping}`, `**❯ Message:** ${latency}`, '\u200b'].join(
					'\n',
				),
			)
			.addField(
				'Database',
				[
					`**❯ Read:** ${db.read}`,
					`**❯ Write:** ${db.write}`,
					`**❯ Average:** ${db.average}`,
					'\u200b',
				].join('\n'),
			)
			.setColor('RANDOM')
			.setFooter(
				`Requested by ${msg.author.tag}`,
				msg.author.displayAvatarURL({ dynamic: true, size: 4096 }),
			)
			.setTimestamp();

		return msg.say(embed);
	}
};
