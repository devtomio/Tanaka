const Event = require('../../Structures/Event');

module.exports = class DBDebugEvent extends Event {
	constructor(...args) {
		super(...args, 'debug', { emitter: 'db' });
	}

	run(data) {
		this.client.logger.debug(`[MongoDB]: ${data}`);
	}
};
