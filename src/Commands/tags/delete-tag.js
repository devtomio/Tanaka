const Command = require('../../Structures/Command');

module.exports = class DeleteTagCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'delete-tag',
			aliases: ['deletetag'],
			memberName: 'delete-tag',
			group: 'tags',
			description: 'Deletes a tag.',
			guildOnly: true,
			args: [
				{
					key: 'name',
					prompt: 'What is the name of the tag?',
					type: 'string',
				},
			],
		});
	}

	async run(msg, { name }) {
		const tag = await this.client.db.get(`tags_${msg.guild.id}-${name}`);

		if (!tag) return msg.reply('That tag does not exist.');
		if (tag.creatorID !== msg.author.id) return msg.reply("You can't delete that tag.");

		await this.client.db.delete(`tags_${msg.guild.id}-${name}`);

		return msg.reply(`Successfully deleted the tag **${name}**.`);
	}
};
