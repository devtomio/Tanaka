const Event = require('../../Structures/Event');

module.exports = class TrackStartEvent extends Event {
	constructor(...args) {
		super(...args, 'trackStart', { emitter: 'trackStart' });
	}

	run(player, track) {
		const channel = this.client.channels.cache.get(player.textChannel);

		channel.send(`Now playing: \`${track.title}\`, requested by ${track.requester.tag}`);
	}
};
