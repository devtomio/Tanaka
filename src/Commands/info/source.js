const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');

module.exports = class SourceCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'source',
			aliases: ['src'],
			memberName: 'source',
			group: 'info',
			description: 'Gets the source code of the command.',
			guarded: true,
			args: [
				{
					key: 'command',
					prompt: 'What is the command?',
					type: 'command',
				},
			],
		});
	}

	async run(msg, { command }) {
		const { body } = await request
			.get(
				`https://api.github.com/repos/1chiSensei/Tanaka/contents/src/Commands/${command.group.name}/${command.name}.js`,
			)
			.query('ref', 'main')
			.set('Accept', 'application/vnd.github.v3+json');
		const embed = new MessageEmbed()
			.setTitle(body.name)
			.setURL(body.html_url)
			.setDescription(
				stripIndents`
				\`\`\`js
				${Buffer.from(body.content, 'base64').toString('utf-8')}
				\`\`\`
			`,
			)
			.setColor('RANDOM')
			.setFooter(`Requested by ${msg.author.tag}`, msg.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		return msg.embed(embed);
	}
};
