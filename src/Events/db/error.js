const Event = require('../../Structures/Event');

module.exports = class DBErrorEvent extends Event {
	constructor(...args) {
		super(...args, 'error', { emitter: 'db' });
	}

	run(err) {
		throw err;
	}
};
