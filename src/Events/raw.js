const Event = require('../Structures/Event');

module.exports = class RawEvent extends Event {
	constructor(...args) {
		super(...args, 'raw');
	}

	run(data) {
		this.client.manager.updateVoiceState(data);
	}
};
