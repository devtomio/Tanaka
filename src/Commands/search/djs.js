const Command = require('../../Structures/Command');
const request = require('node-superfetch');

module.exports = class DJSCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'djs',
			aliases: ['discord.js', 'djs-docs', 'discord.js-docs'],
			memberName: 'djs',
			group: 'search',
			description: 'Searches the discord.js documentation for your query.',
			args: [
				{
					key: 'query',
					prompt: 'What would you like to search for?',
					type: 'string',
				},
				{
					key: 'branch',
					prompt: 'What branch of discord.js would you like to use?',
					type: 'string',
					oneOf: [
						'stable',
						'master',
						'commando',
						'rpc',
						'akairo',
						'akairo-master',
						'collection',
					],
					default: 'stable',
				},
			],
		});
	}

	async run(msg, { query, branch }) {
		try {
			const { body } = await request.get('https://djsdocs.sorta.moe/v2/embed').query({
				src: branch,
				q: encodeURIComponent(query),
			});

			if (body === null) return msg.say("Couldn't find any results for that.");

			return msg.embed(body);
		} catch (err) {
			if (err.status === 404) return msg.say("Couldn't find any results for that.");

			return msg.reply(`An error occured: \`${err.message}\`.`);
		}
	}
};
