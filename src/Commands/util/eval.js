/* eslint-disable no-unused-vars */
const util = require('util');
const discord = require('discord.js');
const tags = require('common-tags');
const { escapeRegex } = require('../../Structures/Util');
const { Command } = require('discord.js-commando');

const nl = '!!NL!!';
const nlPattern = new RegExp(nl, 'g');

module.exports = class EvalCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'eval',
			aliases: ['debug'],
			group: 'util',
			memberName: 'eval',
			description: 'Executes arbitrary JavaScript code.',
			details: 'Only the bot owner may use this command.',
			ownerOnly: true,
			guarded: true,
			args: [
				{
					key: 'script',
					prompt: 'What code would you like to evaluate?',
					type: 'string',
				},
			],
		});

		this.lastResult = null;

		Object.defineProperty(this, '_sensitivePattern', { value: null, configurable: true });
	}

	run(msg, { script }) {
		const { channel, guild, author, member } = msg;
		const message = msg;
		const { client, lastResult } = this;

		const doReply = (val) => {
			if (val instanceof Error) {
				msg.reply(`Callback error: \`${val}\``);
			} else {
				const result = this.makeResultMessages(val, process.hrtime(this.hrStart));

				if (Array.isArray(result)) {
					for (const item of result) msg.reply(item);
				} else {
					msg.reply(result);
				}
			}
		};

		let hrDiff;

		try {
			const hrStart = process.hrtime();
			this.lastResult = eval(script); // eslint-disable-line no-eval

			hrDiff = process.hrtime(hrStart);
		} catch (err) {
			return msg.reply(`Error while evaluating: \`${err}\``);
		}

		this.hrStart = process.hrtime();
		const result = this.makeResultMessages(this.lastResult, hrDiff, script);

		if (Array.isArray(result)) {
			return result.map((item) => msg.reply(item));
		}
		return msg.reply(result);
	}

	makeResultMessages(result, hrDiff, input = null) {
		const inspected = util
			.inspect(result, { depth: 0 })
			.replace(nlPattern, '\n')
			.replace(this.sensitivePattern, '--REDACTED--')
			.replace(this.client.db.url, '--REDACTED--');

		const split = inspected.split('\n');
		const last = inspected.length - 1;
		const prependPart =
			inspected[0] !== '{' && inspected[0] !== '[' && inspected[0] !== "'" ? split[0] : inspected[0];
		const appendPart =
			inspected[last] !== '}' && inspected[last] !== ']' && inspected[last] !== "'"
				? split[split.length - 1]
				: inspected[last];
		const prepend = `\`\`\`javascript\n${prependPart}\n`;
		const append = `\n${appendPart}\n\`\`\``;

		if (input) {
			return discord.splitMessage(
				tags.stripIndents`
				*Callback executed after ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*
				\`\`\`javascript
				${inspected}
				\`\`\`
			`,
				{ maxLength: 1900, prepend, append },
			);
		}
	}

	get sensitivePattern() {
		if (!this._sensitivePattern) {
			const { client } = this;
			let pattern = '';

			if (client.token) pattern += escapeRegex(client.token);

			Object.defineProperty(this, '_sensitivePattern', {
				value: new RegExp(pattern, 'gi'),
				configurable: false,
			});
		}

		return this._sensitivePattern;
	}
};
