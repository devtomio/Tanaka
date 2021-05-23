const { WebhookClient, MessageEmbed } = require('discord.js');
const Event = require('../../Structures/Event');
const { htmlToText } = require('html-to-text');

module.exports = class RSSNewItemEvent extends Event {
	constructor(...args) {
		super(...args, 'item:new:anime', { emitter: 'rss' });
	}

	/** @param {import('rss-emitter-ts').FeedItem} item */
	run(item) {
		this.client.guilds.cache.forEach(async (guild) => {
			if (!guild.available) guild = await guild.fetch();
			const data = await this.client.db.get(`animeUpdates-${guild.id}`);

			if (!data) return;

			const hook = new WebhookClient(data.id, data.token);
			const embed = new MessageEmbed()
				.setTitle(`**${item.title}**`)
				.setAuthor(item.author)
				.setDescription(htmlToText(item.description))
				.setURL(item.link)
				.setColor('RANDOM')
				.setImage(item.image || 'https://i.imgur.com/R3JCtNK.jpg')
				.setTimestamp();

			hook.send(embed);
		});
	}
};
