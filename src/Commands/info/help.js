const { ButtonComponent, ComponentActionRow, LinkButtonComponent } = require('@duxcore/interactive-discord');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { permissions } = require('../../Structures/Util');

module.exports = class HelpCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'help',
			aliases: ['cmd', 'commands'],
			group: 'info',
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
			const owner = this.client.isOwner(msg.author);
			const embed = new MessageEmbed()
				.setTitle('Help Menu')
				.setDescription('To get started, press one of the buttons!')
				.setColor('RANDOM')
				.setFooter('Do t!help <command> to get information about a command!')
				.setTimestamp();
			const utilButton = new ButtonComponent({
				label: 'Utility',
				style: 1,
			});
			const tagButton = new ButtonComponent({
				label: 'Tags',
				style: 1,
			});
			const searchButton = new ButtonComponent({
				label: 'Search',
				style: 1,
			});
			const remindButton = new ButtonComponent({
				label: 'Reminder',
				style: 1,
			});
			const otherButton = new ButtonComponent({
				label: 'Other',
				style: 1,
			});
			const infoButton = new ButtonComponent({
				label: 'Information',
				style: 1,
			});
			const imageButton = new ButtonComponent({
				label: 'Image Manipulation',
				style: 1,
			});
			const codeBinButton = new ButtonComponent({
				label: 'Code Bins',
				style: 1,
			});
			const randomButton = new ButtonComponent({
				label: 'Random Response',
				style: 1,
			});
			const animeButton = new ButtonComponent({
				label: 'Anime',
				style: 1,
			});
			const backButton = new ButtonComponent({
				label: 'Go Back',
				style: 3,
			});
			const webButton = new LinkButtonComponent('https://tanaka-bot.me', {
				label: 'Website',
				style: 1,
			});
			const row1 = new ComponentActionRow(utilButton, searchButton, remindButton);
			const row2 = new ComponentActionRow(tagButton, otherButton, animeButton);
			const row3 = new ComponentActionRow(infoButton, imageButton, randomButton);
			const row4 = new ComponentActionRow(backButton, codeBinButton, webButton);

			this.client.interactions.sendComponents({
				channel: msg.channel,
				content: '\u200b',
				components: [row1, row2, row3, row4],
				embed,
			});
			this.client.interactions.addButtonListener(utilButton, (interaction) => {
				if (interaction.member.id !== msg.author.id)
					return interaction.respond({
						content: "You aren't part of this interaction...",
						private: true,
					});

				const cmds = this.client.registry.groups.get('util').commands.filter((cmd) => {
					if (owner) return true;
					if (cmd.ownerOnly || cmd.hidden) return false;
					if (cmd.nsfw && !msg.channel.nsfw) return false;
					return true;
				});

				embed.setDescription(cmds.map((cmd) => `\`${cmd.name}\``).join(' '));
				interaction.respond({ shouldEdit: true, embeds: [embed] });
			});
			this.client.interactions.addButtonListener(searchButton, (interaction) => {
				if (interaction.member.id !== msg.author.id)
					return interaction.respond({
						content: "You aren't part of this interaction...",
						private: true,
					});

				const cmds = this.client.registry.groups.get('search').commands.filter((cmd) => {
					if (owner) return true;
					if (cmd.ownerOnly || cmd.hidden) return false;
					if (cmd.nsfw && !msg.channel.nsfw) return false;
					return true;
				});

				embed.setDescription(cmds.map((cmd) => `\`${cmd.name}\``).join(' '));
				interaction.respond({ shouldEdit: true, embeds: [embed] });
			});
			this.client.interactions.addButtonListener(remindButton, (interaction) => {
				if (interaction.member.id !== msg.author.id)
					return interaction.respond({
						content: "You aren't part of this interaction...",
						private: true,
					});

				const cmds = this.client.registry.groups.get('remind').commands.filter((cmd) => {
					if (owner) return true;
					if (cmd.ownerOnly || cmd.hidden) return false;
					if (cmd.nsfw && !msg.channel.nsfw) return false;
					return true;
				});

				embed.setDescription(cmds.map((cmd) => `\`${cmd.name}\``).join(' '));
				interaction.respond({ shouldEdit: true, embeds: [embed] });
			});
			this.client.interactions.addButtonListener(randomButton, (interaction) => {
				if (interaction.member.id !== msg.author.id)
					return interaction.respond({
						content: "You aren't part of this interaction...",
						private: true,
					});

				const cmds = this.client.registry.groups.get('random').commands.filter((cmd) => {
					if (owner) return true;
					if (cmd.ownerOnly || cmd.hidden) return false;
					if (cmd.nsfw && !msg.channel.nsfw) return false;
					return true;
				});

				embed.setDescription(cmds.map((cmd) => `\`${cmd.name}\``).join(' '));
				interaction.respond({ shouldEdit: true, embeds: [embed] });
			});
			this.client.interactions.addButtonListener(otherButton, (interaction) => {
				if (interaction.member.id !== msg.author.id)
					return interaction.respond({
						content: "You aren't part of this interaction...",
						private: true,
					});

				const cmds = this.client.registry.groups.get('other').commands.filter((cmd) => {
					if (owner) return true;
					if (cmd.ownerOnly || cmd.hidden) return false;
					if (cmd.nsfw && !msg.channel.nsfw) return false;
					return true;
				});

				embed.setDescription(cmds.map((cmd) => `\`${cmd.name}\``).join(' '));
				interaction.respond({ shouldEdit: true, embeds: [embed] });
			});
			this.client.interactions.addButtonListener(infoButton, (interaction) => {
				if (interaction.member.id !== msg.author.id)
					return interaction.respond({
						content: "You aren't part of this interaction...",
						private: true,
					});

				const cmds = this.client.registry.groups.get('info').commands.filter((cmd) => {
					if (owner) return true;
					if (cmd.ownerOnly || cmd.hidden) return false;
					if (cmd.nsfw && !msg.channel.nsfw) return false;
					return true;
				});

				embed.setDescription(cmds.map((cmd) => `\`${cmd.name}\``).join(' '));
				interaction.respond({ shouldEdit: true, embeds: [embed] });
			});
			this.client.interactions.addButtonListener(imageButton, (interaction) => {
				if (interaction.member.id !== msg.author.id)
					return interaction.respond({
						content: "You aren't part of this interaction...",
						private: true,
					});

				const cmds = this.client.registry.groups.get('img').commands.filter((cmd) => {
					if (owner) return true;
					if (cmd.ownerOnly || cmd.hidden) return false;
					if (cmd.nsfw && !msg.channel.nsfw) return false;
					return true;
				});

				embed.setDescription(cmds.map((cmd) => `\`${cmd.name}\``).join(' '));
				interaction.respond({ shouldEdit: true, embeds: [embed] });
			});
			this.client.interactions.addButtonListener(codeBinButton, (interaction) => {
				if (interaction.member.id !== msg.author.id)
					return interaction.respond({
						content: "You aren't part of this interaction...",
						private: true,
					});

				const cmds = this.client.registry.groups.get('codebin').commands.filter((cmd) => {
					if (owner) return true;
					if (cmd.ownerOnly || cmd.hidden) return false;
					if (cmd.nsfw && !msg.channel.nsfw) return false;
					return true;
				});

				embed.setDescription(cmds.map((cmd) => `\`${cmd.name}\``).join(' '));
				interaction.respond({ shouldEdit: true, embeds: [embed] });
			});
			this.client.interactions.addButtonListener(animeButton, (interaction) => {
				if (interaction.member.id !== msg.author.id)
					return interaction.respond({
						content: "You aren't part of this interaction...",
						private: true,
					});

				const cmds = this.client.registry.groups.get('anime').commands.filter((cmd) => {
					if (owner) return true;
					if (cmd.ownerOnly || cmd.hidden) return false;
					if (cmd.nsfw && !msg.channel.nsfw) return false;
					return true;
				});

				embed.setDescription(cmds.map((cmd) => `\`${cmd.name}\``).join(' '));
				interaction.respond({ shouldEdit: true, embeds: [embed] });
			});
			this.client.interactions.addButtonListener(backButton, (interaction) => {
				if (interaction.member.id !== msg.author.id)
					return interaction.respond({
						content: "You aren't part of this interaction...",
						private: true,
					});

				embed.setDescription('To get started, press one of the buttons!');
				interaction.respond({ shouldEdit: true, embeds: [embed] });
			});

			return;
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
