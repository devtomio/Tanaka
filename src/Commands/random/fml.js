const { Command } = require('discord.js-commando');
const request = require('node-superfetch');

module.exports = class FMLCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'fml',
			aliases: ['fuck-my-life'],
			group: 'random',
			memberName: 'fml',
			description: 'Responds with a random FML quote.',
		});
	}

	async run(msg) {
		const { body } = await request
			.get('https://api.1chi.tk/fml')
			.set({ 'User-Agent': 'TanakaBot 1.0.0 (https://github.com/1chiSensei/Tanaka)' });

		return msg.say(`\`\`\`${body.quote}\`\`\``);
	}
};
