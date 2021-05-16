const { MessageEmbed, version: djsVersion } = require('discord.js');
const { formatBytes } = require('../../Structures/Util');
const { version } = require('../../../package.json');
const { Command } = require('discord.js-commando');
const { utc } = require('moment');
const os = require('os');
const ms = require('ms');

module.exports = class InfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'info',
			aliases: ['bot-info', 'botinfo'],
			group: 'info',
			memberName: 'info',
			description: 'Responds with the general information of the bot.',
			clientPermissions: ['EMBED_LINKS'],
			guarded: true,
		});
	}

	run(msg) {
		const core = os.cpus()[0];
		const embed = new MessageEmbed()
			.setTitle('Bot Information')
			.setThumbnail(this.client.user.displayAvatarURL({ size: 4096 }))
			.setColor('RANDOM')
			.addField('General', [
				`**❯ Client:** ${this.client.user.tag} \`(${this.client.user.id})\``,
				`**❯ Commands:** ${this.client.registry.commands.size}`,
				`**❯ Guilds:** ${this.client.guildCount.toLocaleString()}`,
				`**❯ Users:** ${this.client.userCount.toLocaleString()}`,
				`**❯ Channels:** ${this.client.channelCount.toLocaleString()}`,
				`**❯ Creation Date:** \`${utc(this.client.user.createdTimestamp).format(
					'Do MMMM YYYY HH:mm:ss',
				)}\``,
				`**❯ Node.js:** \`${process.version}\``,
				`**❯ Version:** \`v${version}\``,
				`**❯ Discord.js:** \`v${djsVersion}\``,
				'**❯ Repository:** <https://github.com/1chiSensei/Tanaka>',
				'**❯ Invite:** <https://tanaka-bot.me/invite>',
				'**❯ Website:** <https://tanaka-bot.me>',
				'\u200b',
			])
			.addField('System', [
				`**❯ Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
				`**❯ Platform:** ${process.platform}`,
				`**❯ Arch:** ${process.arch}`,
				`**❯ CPU:**`,
				`\u3000 Cores: ${os.cpus().length}`,
				`\u3000 Model: ${core.model}`,
				`\u3000 Speed: ${core.speed}MHz`,
				`**❯ Memory:**`,
				`\u3000 Total: ${formatBytes(process.memoryUsage().heapTotal)}`,
				`\u3000 Used: ${formatBytes(process.memoryUsage().heapUsed)}`,
			])
			.setTimestamp();

		return msg.say(embed);
	}
};
