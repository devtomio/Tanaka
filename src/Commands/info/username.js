const Command = require('../../Structures/Command');
const { oneLine } = require('common-tags');

module.exports = class UsernameCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'username',
			aliases: ['name', 'user-name'],
			memberName: 'username',
			group: 'info',
			description: 'Shows the username of a user.',
			details: oneLine`
				Shows the discord username of a user.
				If <tag> is set to yes, it will include the discriminator of the user.
			`,
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
		return msg.say(`The username of that user is ${tag ? user.tag : user.username}.`);
	}
};
