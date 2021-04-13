const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { permissions } = require('../../Structures/Util');

module.exports = class HelpCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'help',
			aliases: ['cmd', 'commands'],
			group: 'util',
			memberName: 'help',
			description:
				'Displays a list of available commands, or detailed information for a specific command.',
			guarded: true,
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'command',
					prompt: 'Which command would you like to view the information for?',
					type: 'command',
					default: '',
				},
			],
		});
	}

	async run(msg, { command }) {
		if (!command) {
			const embeds = [];
			for (let i = 0; i < Math.ceil(this.client.registry.groups.size / 10); i++) {
				const embed = new MessageEmbed().setTitle(`Command List (${i + 1})`).setColor('RANDOM');

				embeds.push(embed);
			}

			let cmdCount = 0;
			let i = 0;
			let embedIndex = 0;

			for (const group of this.client.registry.groups.values()) {
				i++;

				const owner = this.client.isOwner(msg.author);
				const commands = group.commands.filter((cmd) => {
					if (owner) return true;
					if (cmd.ownerOnly || cmd.hidden) return false;
					if (cmd.nsfw && !msg.channel.nsfw) return false;
					return true;
				});

				if (!commands.size) continue;
				cmdCount += commands.size;

				if (i > embedIndex * 10 + 10) embedIndex++;

				embeds[embedIndex].addField(
					`${group.name}`,
					commands.map((cmd) => `\`${cmd.name}\``).join(' '),
				);
			}

			const allShown = cmdCount === this.client.registry.groups.size;
			embeds[embeds.length - 1].setFooter(
				`${this.client.registry.commands.size} Commands ${
					allShown ? '' : ` (${cmdCount} Shown)`
				}`,
			);

			try {
				const msgs = [];
				for (const embed of embeds) msgs.push(await msg.direct({ embed }));

				if (msg.channel.type !== 'dm') msgs.push(await msg.say('Check your DMs!'));

				return msgs;
			} catch {
				return msg.reply('You have your DMs disabled!');
			}
		}

		const userPerms = command.userPermissions
			? command.userPermissions.map((perm) => permissions[perm]).join(', ')
			: 'None';
		const clientPerms = command.clientPermissions
			? command.clientPermissions.map((perm) => permissions[perm]).join(', ')
			: 'None';

		const emb = new MessageEmbed()
			.setTitle(
				`__Command **${command.name}**__${
					command.guildOnly ? ' (Usable only in servers)' : ''
				}`,
			)
			.setDescription(`${command.description}${command.details ? `\n${command.details}` : ''}`)
			.addField('**Format:**', `${command.usage(command.format || '')}`)
			.addField('**Aliases:**', `${command.aliases.join(', ') || 'None'}`)
			.addField('**Group:**', `${command.group.name} (\`${command.groupID}:${command.memberName}\`)`)
			.addField('**NSFW:**', `${command.nsfw ? 'Yes' : 'No'}`)
			.addField('**User Permissions:**', userPerms)
			.addField('**Bot Permissions:**', clientPerms)
			.setColor('RANDOM')
			.setFooter(
				`Requested by ${msg.author.tag}`,
				msg.author.displayAvatarURL({ dynamic: true, size: 4096 }),
			)
			.setTimestamp();

		return msg.say(emb);
	}
};
