const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');

module.exports = class ReverseCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'reverse',
			aliases: ['flip'],
			memberName: 'reverse',
			group: 'other',
			description: 'Reverses a string.',
			args: [
				{
					key: 'string',
					prompt: 'What is the string that you want to reverse?',
					type: 'string',
					max: 500,
				},
			],
		});
	}

	run(msg, { string }) {
		return msg.say(stripIndents`
			\`\`\`
			${string}
			\`\`\`

			Reversed:
			\`\`\`
			${[...string].reverse().join('')}
			\`\`\`
		`);
	}
};
