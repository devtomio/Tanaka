const { Command } = require('discord.js-commando');
const request = require('node-superfetch');

module.exports = class StarbinCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'starbin',
			group: 'codebin',
			memberName: 'starbin',
			description: 'Uploades your code to https://starb.in.',
			args: [
				{
					key: 'code',
					prompt: 'What is the code that you want to upload?',
					type: 'code',
				},
			],
		});
	}

	async run(msg, { code }) {
		try {
			const { body } = await request.post('https://starb.in/documents').send(code.code).set({
				'User-Agent': 'TanakaBot (https://github.com/1chiSensei/Tanaka)',
				'Content-Type': 'text/plain',
			});

			return msg.embed({
				description: `The link to the code is [\`here\`](https://starb.in/${body.key}.txt)!`,
			});
		} catch {
			return msg.say('The Starbin API returned an error. Please try again later.');
		}
	}
};
