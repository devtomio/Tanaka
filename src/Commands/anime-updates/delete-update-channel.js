const { Command } = require('discord.js-commando');

module.exports = class DeleteUpdateChannelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'delete-update-channel',
			aliases: ['delete-up-channel', 'del-up-channel'],
			group: 'anime-updates',
			memberName: 'delete-update-channel',
			description: 'Deletes the anime updates channel.',
			clientPermissions: ['MANAGE_WEBHOOKS'],
			userPermissions: ['MANAGE_GUILD'],
			guildOnly: true,
		});
	}

	async run(msg) {
		await this.client.db.delete(`animeUpdate-${msg.guild.id}`);

		return msg.say(`The anime updates has been deleted.`);
	}
};
