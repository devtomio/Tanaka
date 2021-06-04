const Event = require('../Structures/Event');

module.exports = class CommandRunEvent extends Event {
	constructor(...args) {
		super(...args, 'commandRun');
	}

	/** @param {import('../Structures/Command')} command */
	async run(command) {
		command.uses++;

		await this.client.db.add('commandRuns', 1);
	}
};
