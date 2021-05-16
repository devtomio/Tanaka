module.exports = class Event {
	/**
	 * @param {import('./Client')} client
	 * @param {string} name
	 * @param {Object} options
	 * @param {string} [options.once]
	 * @param {string} [options.emitter]
	 */
	constructor(client, name, options = {}) {
		this.name = name;
		this.client = client;
		this.type = options.once ? 'once' : 'on';
		this.emitter =
			(typeof options.emitter === 'string' ? this.client[options.emitter] : options.emitter) ||
			this.client;
	}

	// eslint-disable-next-line no-unused-vars
	async run(...args) {
		throw new Error(`The run method has not been implemented in ${this.constructor.name}.`);
	}
};
