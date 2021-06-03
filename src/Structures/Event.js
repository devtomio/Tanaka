module.exports = class Event {
	/**
	 * @param {import('./Client')} client
	 * @param {keyof import('discord.js').ClientEvents|keyof import('quickmongo').Events|keyof import('@duxcore/interactive-discord/src/util/types/events').Events} name
	 * @param {Object} options
	 * @param {boolean} [options.once]
	 * @param {'db'|'client'|'interactions'} [options.emitter]
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
