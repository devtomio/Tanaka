const Event = require('../../Structures/Event');
const { MessageEmbed } = require('discord.js');

module.exports = class QueueEndEvent extends Event {
	constructor(...args) {
		super(...args, 'queueEnd', { emitter: 'manager' });
	}

	run(player) {
		const channel = this.client.channels.cache.get(player.textChannel);

		const embed = new MessageEmbed({ description: 'The queue has ended.', color: 'RANDOM' });

		channel.send(embed);
		player.destroy();
	}
};
