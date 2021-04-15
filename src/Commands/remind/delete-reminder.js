const { Command } = require('discord.js-commando');

module.exports = class DeleteReminderCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'delete-reminder',
			aliases: ['delete-reminder', 'del-reminder', 'del-remind'],
			group: 'remind',
			memberName: 'delete-reminder',
			description: 'Deletes your reminder.',
		});
	}

	async run(msg) {
		const exists = await this.client.timers.exists(msg.channel.id, msg.author.id);
		if (!exists) return msg.reply('You do not have a timer set in this channel.');

		await this.client.timers.deleteTimer(msg.channel.id, msg.author.id);

		return msg.say('Your timer has been deleted.');
	}
};
