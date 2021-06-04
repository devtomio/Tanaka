const Command = require('../../Structures/Command');
const { create } = require('sourcebin');

module.exports = class SourcebinCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'sourcebin',
			group: 'codebin',
			memberName: 'sourcebin',
			description: 'Uploades your code to https://sourceb.in.',
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
			title: 'Code Snippet',
			description: 'Uploaded by TanakaBot <https://github.com/1chiSensei/Tanaka>',
		});

		return msg.embed({ description: `The link to the code is [\`here\`](${link.url})!` });
	}
};
