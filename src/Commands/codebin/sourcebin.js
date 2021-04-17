const { Command } = require('discord.js-commando');
const { create } = require('sourcebin');

module.exports = class SourcebinCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'sourcebin',
			group: 'codebin',
			memberName: 'sourcebin',
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
		const link = await create([{ content: code.code, language: 'text' }], {
			title: 'CodeBin',
			description: 'Uploaded by TanakaBot <https://github.com/1chiSensei/Tanaka>',
		});

		return msg.say(`The link to the code is: ${link.url}!`);
	}
};
