const { MessageEmbed, version: djsVersion } = require('discord.js');
const { version } = require('../../../package.json');
const { Command } = require('discord.js-commando');
const { drive, mem } = require('node-os-utils');
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

	async run(msg) {
		const core = os.cpus()[0];
		const driveInfo = await drive.info();
		const memory = await mem.info();
		const embed = new MessageEmbed()
			.setTitle('Bot Information')
			.setThumbnail(this.client.user.displayAvatarURL({ size: 4096 }))
			.setColor('RANDOM')
			.addField('General', [
				`**❯ Client:** ${this.client.user.tag} \`(${this.client.user.id})\``,
				`**❯ Commands:** ${this.client.registry.commands.size}`,
				`**❯ Guilds:** ${(await this.client.guildCount()).toLocaleString()}`,
				`**❯ Users:** ${(await this.client.userCount()).toLocaleString()}`,
				`**❯ Channels:** ${(await this.client.channelCount()).toLocaleString()}`,
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
				`\u3000 Total: ${memory.totalMemMb} MB`,
				`\u3000 Free: ${memory.freeMemMb} MB`,
				`\u3000 Used: ${memory.usedMemMb} MB`,
				`**❯ Drive:**`,
				`\u3000 Total: ${driveInfo.totalGb} GB`,
				`\u3000 Free: ${driveInfo.freeGb} GB`,
				`\u3000 Used: ${driveInfo.usedGb} GB`,
			])
			.setTimestamp();

		return msg.say(embed);
	}
};
