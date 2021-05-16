const Event = require('../../Structures/Event');

module.exports = class DatabaseErrorEvent extends Event {
	constructor(...args) {
		super(...args, 'error', { emitter: 'db' });
	}

	run(err) {
		this.client.logger.error(err);
	}
};
