const { Command } = require('discord.js-commando');

module.exports = class ChangeUpdateChannelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'change-update-channel',
			aliases: ['change-up-channel'],
			group: 'anime-updates',
			memberName: 'change-update-channel',
			description: 'Changes the anime updates channel.',
			clientPermissions: ['MANAGE_WEBHOOKS'],
			userPermissions: ['MANAGE_GUILD'],
			guildOnly: true,
			args: [
				{
					key: 'channel',
					prompt: 'What channel would you like to set up the updates?',
					type: 'text-channel',
				},
			],
		});
	}

	async run(msg, { channel }) {
		const hook = await channel.createWebhook('Tanaka | Anime Updates', {
			avatar: this.client.user.displayAvatarURL({ size: 4096 }),
			reason: 'Anime Updates',
		});

		await this.client.db.set(`animeUpdates-${msg.guild.id}`, { token: hook.token, id: hook.id });

		return msg.say(`The anime updates channel has been changed to: <#${channel.id}>!`);
	}
};
