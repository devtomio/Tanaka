const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const { getImage } = require('random-reddit');

module.exports = class PenisCommand extends Command {
	/** @param {import('../../Structures/Client')} client */
	constructor(client) {
		super(client, {
			name: 'penis',
			aliases: ['cock'],
			memberName: 'penis',
			group: 'nsfw',
			description: 'Sends a random penis.',
			nsfw: true,
			clientPermissions: ['EMBED_LINKS'],
		});
	}

	async run(msg) {
		msg.channel.startTyping();

		const srs = ['cock', 'MassiveCock', 'ratemycock', 'penis', 'tinydick', 'tipofmypenis'];
		const subreddit = srs[Math.floor(Math.random() * srs.length)];
		const data = await getImage(subreddit, Infinity);
		const embed = new MessageEmbed()
			.setColor('#FF4500')
			.setAuthor(
				`r/${subreddit}`,
				'https://i.imgur.com/DSBOK0P.png',
				`https://reddit.com/r/${subreddit}`,
			)
			.setImage(data)
			.setTimestamp()
			.setFooter(`Requested by ${msg.author.tag}`);

		msg.channel.stopTyping();

		return msg.embed(embed);
	}
};
