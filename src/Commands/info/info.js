const { Command, version: commandoVersion } = require('discord.js-commando');
const { MessageEmbed, version: djsVersion } = require('discord.js');
const { version } = require('../../../package.json');
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
				`**<:cloudfill:848893708861833226> Client:** ${this.client.user.tag} \`(${this.client.user.id})\``,
				`**<:terminalboxfill:848893988400267326> Commands:** ${this.client.registry.commands.size}`,
				`**<:group2fill:848894240602980404> Guilds:** ${(
					await this.client.guildCount()
				).toLocaleString()}`,
				`**<:user1:848729325980876842> Users:** ${(
					await this.client.userCount()
				).toLocaleString()}`,
				`**<:listordered:848777308794126346> Channels:** ${(
					await this.client.channelCount()
				).toLocaleString()}`,
				`**<:clock1k:848734465102708766> Creation Date:** \`${utc(
					this.client.user.createdTimestamp,
				).format('Do MMMM YYYY HH:mm:ss')}\``,
				`**<:nodejsoriginal:848895168500858881> Node.js:** \`${process.version}\``,
				`**<:gitcommitfill:848895424940212225> Version:** \`v${version}\``,
				`**<:djs:848896122444447814> Discord.js:** \`v${djsVersion}\``,
				`**<:djsnext:848896433658265660> Commando:** \`v${commandoVersion}\``,
				`**<:barchartboxfill:848896660473118720> Uptime:** ${ms(this.client.uptime, {
					long: true,
				})}`,
				'**<:gitrepositoryfill:848896926489378847> Repository:** <https://github.com/1chiSensei/Tanaka>',
				'**<:replyallfill:848897523740835861> Invite:** <https://tanaka-bot.me/invite>',
				'**<:window2fill:848897904990355456> Website:** <https://tanaka-bot.me>',
				'\u200b',
			])
			.addField('System', [
				`**<:barchartboxfill:848896660473118720> Uptime:** ${ms(os.uptime() * 1000, {
					long: true,
				})}`,
				`**<:ancientgatefill:848898162763759667> Platform:** ${process.platform}`,
				`**<:archivefill:848898727028326410> Arch:** ${process.arch}`,
				`**<:cpufill:848899130226901002> CPU:**`,
				`\u3000 Cores: ${os.cpus().length}`,
				`\u3000 Model: ${core.model}`,
				`\u3000 Speed: ${core.speed}MHz`,
				`**<:harddrivefill:848899816976810024> Memory:**`,
				`\u3000 Total: ${memory.totalMemMb} MB`,
				`\u3000 Free: ${memory.freeMemMb} MB`,
				`\u3000 Used: ${memory.usedMemMb} MB`,
				`**<:harddrive2fill:848900518709166100> Drive:**`,
				`\u3000 Total: ${driveInfo.totalGb} GB`,
				`\u3000 Free: ${driveInfo.freeGb} GB`,
				`\u3000 Used: ${driveInfo.usedGb} GB`,
			])
			.setTimestamp();

		return msg.say(embed);
	}
};
