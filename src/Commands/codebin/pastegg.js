const Command = require('../../Structures/Command');
const request = require('node-superfetch');

module.exports = class PasteGGCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'pastegg',
			group: 'codebin',
			memberName: 'pastegg',
			description: 'Uploades your code to https://paste.gg.',
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
		const { body } = await request
			.post('https://api.paste.gg/v1/pastes')
			.set('Content-Type', 'application/json')
			.send(
				JSON.stringify({
					name: 'Code Snippet',
					description: 'Uploaded by TanakaBot <https://github.com/1chiSensei/Tanaka>',
					files: [
						{
							name: 'code.txt',
							content: {
								format: 'text',
								value: code.code,
							},
						},
					],
				}),
			);

		return msg.embed({
			description: `The link to the code is [\`here\`](https://paste.gg/${body.result.id})!`,
		});
	}
};
