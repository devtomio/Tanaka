const Event = require('../../Structures/Event');

module.exports = class SelectionInteractionEvent extends Event {
	constructor(...args) {
		super(...args, 'selectionInteraction', { emitter: 'interactions' });
	}

	/** @param {import('@duxcore/interactive-discord').SelectionInteractionController} interaction */
	run(interaction) {
		if (!interaction.isHandled)
			interaction.respond({ isPrivate: true, content: 'This interaction has ended.' });
	}
};
