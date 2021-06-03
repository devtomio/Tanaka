const Event = require('../../Structures/Event');

module.exports = class DBReadyEvent extends Event {
	constructor(...args) {
		super(...args, 'ready', {
			once: true,
			emitter: 'db',
		});
	}

	run() {
		this.client.logger.info('[MongoDB]: Ready!');
	}
};
