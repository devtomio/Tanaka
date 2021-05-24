const { shorten } = require('../../Structures/Util');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

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
		const srs = ['cock', 'MassiveCock', 'ratemycock', 'penis', 'tinydick', 'tipofmypenis'];
		const subreddit = srs[Math.floor(Math.random() * srs.length)];
		const res = await this.client.reddit.getHot(subreddit);
		const data = res[Math.floor(Math.random() * res.length)];
		const embed = new MessageEmbed()
			.setColor('#FF4500')
			.setAuthor(
				`r/${subreddit}`,
				'https://i.imgur.com/DSBOK0P.png',
				`https://reddit.com/r/${subreddit}`,
			)
			.setTitle(shorten(data.title, 256))
			.setImage(data.post_hint === 'image' ? data.url : null)
			.setURL(`https://reddit.com${data.permalink}`)
			.setTimestamp(data.created_utc * 1000)
			.setFooter(`⬆ ${data.ups}`);

		return msg.embed(embed);
	}
};
