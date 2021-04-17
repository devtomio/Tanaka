const { Command } = require('discord.js-commando');
const request = require('node-superfetch');

module.exports = class PastebinCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'pastebin',
			group: 'codebin',
			memberName: 'pastebin',
			description: 'Uploades your code to pastebin.',
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
		const { text } = await request
			.post('https://pastebin.com/api/api_post.php')
			.attach({
				api_dev_key: process.env.PASTEBIN_KEY,
				api_option: 'paste',
				api_paste_code: code.code,
				api_paste_private: '0',
			})
			.set({ 'User-Agent': 'TanakaBot (https://github.com/1chiSensei/Tanaka)' });

		return msg.say(`The link to the code is: ${text}!`);
	}
};
