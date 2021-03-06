const { ArgumentType } = require('discord.js-commando');
const codeblock = /```(?:(\S+)\n)?\s*([^]+?)\s*```/i;

module.exports = class CodeType extends ArgumentType {
	constructor(client) {
		super(client, 'code');
	}

	validate(value) {
		if (!value) return false;

		return true;
	}

	async parse(value, msg) {
		if (!value) return null;
		if (/^[0-9]+$/.test(value)) {
			try {
				const message = await msg.channel.messages.fetch(value);
				value = message.content;
			} catch {
				return { code: value, lang: null };
			}
		}
		if (codeblock.test(value)) {
			const parsed = codeblock.exec(value);

			return {
				code: parsed[2],
				lang: parsed[1] ? parsed[1].toLowerCase() : null,
			};
		}

		return { code: value, lang: null };
	}
};
