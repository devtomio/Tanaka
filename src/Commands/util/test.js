const { ButtonComponent, ComponentActionRow } = require('@duxcore/interactive-discord');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class TestCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'test',
			memberName: 'test',
			group: 'util',
			description: 'The test command.',
			guarded: true,
			hidden: true,
		});
	}

	run(msg) {
		const hiButton = new ButtonComponent({
			style: 1,
			label: 'Hi!',
		});
		const byeButton = new ButtonComponent({
			style: 1,
			label: 'Bye :(',
		});
		const embed = new MessageEmbed().setTitle('More Buttons!').setDescription('Click one of the buttons!');
		const row = new ComponentActionRow(hiButton, byeButton);

		this.client.interactions.sendComponents({
			channel: msg.channel,
			components: row,
			content: '\u200b',
			embed,
		});
		this.client.interactions.addButtonListener(hiButton, (interaction) => {
			embed.setDescription('Hi button clicked');
			interaction.respond({ shouldEdit: true, embeds: [embed] });
		});

		this.client.interactions.addButtonListener(byeButton, (interaction) => {
			embed.setDescription('Bye button clicked');
			interaction.respond({ shouldEdit: true, embeds: [embed] });
		});
	}
};
