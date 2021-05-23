const languages = require('../../Assets/json/langs.json');
const { shorten } = require('../../Structures/Util');
const { Command } = require('discord.js-commando');

module.exports = class RunCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'run',
			aliases: ['run-code', 'piston'],
			memberName: 'run',
			group: 'search',
			description: 'Runs code in a virtual container.',
			args: [
				{
					key: 'lang',
					label: 'language',
					prompt: 'What is the language of the code?',
					type: 'string',
					oneOf: languages,
				},
				{
					key: 'code',
					prompt: 'What is the code that you want to run?',
					type: 'code',
				},
			],
			throttling: {
				duration: 10,
				usages: 2,
			},
		});
	}

	async run(msg, { lang, code }) {
		const result = await this.client.piston.eval(lang, code.code);

		return msg.say(`\`\`\`sh\n${shorten(result.output, 1900)}\n\`\`\``);
	}
};
