const { Command } = require('discord.js-commando');
const { execSync } = require('child_process');

module.exports = class NoPasteCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'nopaste',
			group: 'codebin',
			memberName: 'nopaste',
			description: 'Uploades your code to https://nopaste.ml.',
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
		const link = execSync(
			`echo -n '${code.code}' | lzma | base64 -w0 | xargs -0 printf "https://nopaste.ml/#%s\\n"`,
			{ timeout: 100000, encoding: 'utf-8' },
		);

		return msg.embed({ description: `The link to the code is [\`here\`](${link.trim()})!` });
	}
};
