const { Command } = require('discord.js-commando');
const request = require('node-superfetch');

module.exports = class HastebinCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'hastebin',
			group: 'codebin',
			memberName: 'hastebin',
			description: 'Uploades your code to https://hastebin.com.',
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
			const { body } = await request.post('https://hastebin.com/documents').send(code.code).set({
				'User-Agent': 'TanakaBot (https://github.com/1chiSensei/Tanaka)',
				'Content-Type': 'text/plain',
			});

			return msg.say(`The link to the code is: \`https://hastebin.com/${body.key}.txt\``);
		} catch {
			return msg.say('The Hastebin API returned an error. Please try again later.');
		}
	}
};
