const { ButtonComponent, ComponentCluster } = require('@duxcore/interactive-discord');
const { Command } = require('discord.js-commando');

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
		const button = new ButtonComponent({
			style: 1,
			label: 'I am a button.',
		});
		const cluster = new ComponentCluster(button);

		this.client.interactions.sendComponents('Click Me!', cluster.compile(), msg.channel);
		this.client.interactions.addButtonListener(button, (interaction) =>
			interaction.respond({ content: 'You clicked me! :)', isPrivate: true }),
		);
	}
};
