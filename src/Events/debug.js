const Event = require('../Structures/Event');

module.exports = class DebugEvent extends Event {
	constructor(...args) {
		super(...args, 'debug');
	}

	run(data) {
		this.client.logger.debug(data);
	}
};
