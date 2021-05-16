const Event = require('../Structures/Event');

module.exports = class ErrorEvent extends Event {
	constructor(...args) {
		super(...args, 'error');
	}

	run(err) {
		this.client.logger.error(err);
	}
};
