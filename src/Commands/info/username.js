const { Command } = require('discord.js-commando');

module.exports = class UsernameCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'username',
			aliases: ['name'],
			memberName: 'username',
			group: 'info',
			description: 'Shows the username of a user.',
			args: [
				{
					key: 'user',
					prompt: 'Who is the user that you want to get the username of?',
					type: 'user',
					default: (msg) => msg.author,
				},
				{
					key: 'tag',
					prompt: 'Do you want to include the discriminator of the user?',
					type: 'boolean',
					default: true,
				},
			],
		});
	}

	run(msg, { user, tag }) {
		return msg.say(`The username of that user is ${tag ? user.tag : user.username}`);
	}
};
