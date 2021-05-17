const languages = require('../../../assets/json/langs.json');
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
		});
	}

	async run(msg, { lang, code }) {
		const result = await this.client.piston.eval(lang, code.code);

		return msg.code('sh', result);
	}
};
