const Command = require('../../Structures/Command');

module.exports = class DiscriminatorCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'discriminator',
			aliases: ['discrim'],
			memberName: 'discriminator',
			group: 'info',
			description: 'Shows the discriminator of the user.',
			args: [
				{
					key: 'user',
					prompt: 'Who is the user that you want to get the discriminator of?',
					type: 'user',
					default: (msg) => msg.author,
				},
			],
		});
	}

	run(msg, { user }) {
		return msg.say(`**${user.tag}'s** discriminator is \`${user.discriminator}\`.`);
	}
};
