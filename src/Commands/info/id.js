const Command = require('../../Structures/Command');

module.exports = class IDCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'id',
			aliases: ['user-id'],
			memberName: 'id',
			group: 'info',
			description: 'Shows the id of the user.',
			args: [
				{
					key: 'user',
					prompt: 'Who is the user that you want to get the id?',
					type: 'user',
					default: (msg) => msg.author,
				},
			],
		});
	}

	run(msg, { user }) {
		return msg.say(`The ID of **${user.tag}** is \`${user.id}\`.`);
	}
};
