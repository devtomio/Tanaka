const Event = require('../../Structures/Event');

module.exports = class ButtonInteractionEvent extends Event {
	constructor(...args) {
		super(...args, 'buttonInteraction', { emitter: 'interactions' });
	}

	/** @param {import('@duxcore/interactive-discord').ButtonInteractionController} interaction */
	run(interaction) {
		if (!interaction.isHandled)
			interaction.respond({ isPrivate: true, content: 'This interaction has ended.' });
	}
};
