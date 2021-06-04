const Command = require('../../Structures/Command');

module.exports = class EditTagCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'edit-tag',
			aliases: ['edittag'],
			memberName: 'edit-tag',
			group: 'tags',
			description: 'Edits a tag.',
			guildOnly: true,
			args: [
				{
					key: 'name',
					prompt: 'What is the name of the tag?',
					type: 'string',
				},
				{
					key: 'newContent',
					label: 'new content',
					prompt: 'What is the new content for the tag?',
					type: 'string',
				},
			],
		});
	}

	async run(msg, { name, newContent }) {
		const tag = await this.client.db.get(`tags_${msg.guild.id}-${name}`);

		if (!tag) return msg.reply('That tag does not exist.');
		if (tag.creatorID !== msg.author.id) return msg.reply("You can't edit that tag.");

		await this.client.db.set(`tags_${msg.guild.id}-${name}.content`, newContent);

		return msg.say(`The tag **${name}** has been edited.\nNew Content: \`${newContent}\``);
	}
};
