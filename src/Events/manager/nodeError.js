const Event = require('../../Structures/Event');

module.exports = class NodeErrorEvent extends Event {
	constructor(...args) {
		super(...args, 'nodeError', { emitter: 'manager' });
	}

	run(node, error) {
		this.client.logger.error(`Node "${node.options.identifier}" encountered an error: ${error.message}.`);
	}
};
