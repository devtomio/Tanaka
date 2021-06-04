const { Command } = require('discord.js-commando');
const request = require('node-superfetch');

module.exports = class SpacebinCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'spacebin',
			group: 'codebin',
			memberName: 'spacebin',
			description: 'Uploades your code to https://spaceb.in.',
			args: [
				{
					key: 'code',
					prompt: 'What is the code that you want to upload?',
					type: 'code',
					min: 5,
				},
			],
		});
	}

	async run(msg, { code }) {
		const { body } = await request
			.post('https://spaceb.in/api/v1/documents')
			.set('Content-Type', 'application/json')
			.send(
				JSON.stringify({
					content: code.code,
					extension: 'none',
				}),
			);

		return msg.embed({
			description: `The link to the code is [\`here\`](https://spaceb.in/${body.payload.id})!`,
		});
	}
};
