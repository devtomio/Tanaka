const { Command } = require('discord.js-commando');
const request = require('node-superfetch');

module.exports = class FormatCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'format',
			aliases: ['carbon'],
			memberName: 'format',
			group: 'other',
			description: 'Formats your code.',
			args: [
				{
					key: 'code',
					prompt: 'What is your code?',
					type: 'code',
					max: 1500,
				},
			],
			throttling: {
				usages: 2,
				duration: 30,
			},
		});
	}

	async run(msg, { code }) {
		msg.channel.startTyping();

		const { body } = await request
			.post('https://carbonara.vercel.app/api/cook')
			.send(
				JSON.stringify({
					code: code.code,
					theme: 'One Dark',
					fontFamily: 'Hack',
					paddingVertical: '11px',
					paddingHorizontal: '14px',
				}),
			)
			.set('Content-Type', 'application/json');

		msg.channel.stopTyping();

		return msg.say({ files: [{ attachment: body, name: 'code.png' }] });
	}
};
