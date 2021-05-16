const Event = require('../../Structures/Event');

module.exports = class NodeConnectEvent extends Event {
	constructor(...args) {
		super(...args, 'nodeConnect', { emitter: 'manager' });
	}

	run(node) {
		this.client.logger.info(`Node "${node.options.identifier}" connected.`);
	}
};
