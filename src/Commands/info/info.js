const { MessageEmbed, version: djsVersion } = require('discord.js');
const { formatBytes } = require('../../Structures/Util');
const { version } = require('../../../package.json');
const { Command } = require('discord.js-commando');
const { execSync } = require('child_process');
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
				`**❯ Client:** ${this.client.user.tag} (${this.client.user.id})`,
				`**❯ Commands:** ${this.client.registry.commands.size}`,
				`**❯ Guilds:** ${this.client.guilds.cache.size.toLocaleString()}`,
				`**❯ Users:** ${this.client.guilds.cache
					.reduce((a, b) => a + b.memberCount, 0)
					.toLocaleString()}`,
				`**❯ Channels:** ${this.client.channels.cache.size.toLocaleString()}`,
				`**❯ Creation Date:** \`${utc(this.client.user.createdTimestamp).format(
					'Do MMMM YYYY HH:mm:ss',
				)}\``,
				`**❯ Node.js:** \`${process.version}\``,
				`**❯ Version:** \`v${version}\``,
				`**❯ Discord.js:** \`v${djsVersion}\``,
				`**❯ Commit Hash:** \`${this.getCommitHash()}\``,
				'**❯ Repository:** <https://github.com/1chiSensei/Tanaka>',
				'**❯ Invite:** <https://peico.xyz/BF60P>',
				`**❯ Support Server:** <${process.env.SUPPORT_SERVER}>`,
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

	getCommitHash() {
		const commitHash = execSync('git rev-parse --short HEAD', { timeout: 15000, encoding: 'utf-8' });

		return commitHash.trim();
	}
};
