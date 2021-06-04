/* eslint-disable no-unused-vars */
const { Command } = require('discord.js-commando');
const { oneLine } = require('common-tags');
const { permissions } = require('./Util');

module.exports = class BaseCommand extends Command {
	/**
	 * @param {import('./Client')} client
	 * @param {import('discord.js-commando').CommandInfo} info
	 */
	constructor(client, info) {
		super(client, info);

		this.throttling = info.throttling ?? { usages: 1, duration: 2 };

		/**
		 * @type {number}
		 */
		this.uses = 0;
	}

	/**
	 * @param {import('discord.js-commando').CommandoMessage} message
	 * @param {'guildOnly'|'nsfw'|'permission'|'throttling'|'clientPermissions'} reason
	 * @param {Record<string, any>} data
	 */
	onBlock(message, reason, data) {
		switch (reason) {
			case 'guildOnly':
				return message.embed({
					description: `The \`${this.name}\` command can only be used in guilds...`,
					color: 0xdc143c,
				});
			case 'nsfw':
				return message.embed({
					description: `The \`${this.name}\` command can be only used in NSFW channels...`,
					color: 0xdc143c,
				});
			case 'permission':
				if (data.response) return message.reply(data.response);

				return message.embed({
					description: `You don\'t have permissions to run the \`${this.name}\` command...`,
					color: 0xdc143c,
				});
			case 'clientPermissions':
				if (data.missing.length === 1)
					return message.embed({
						description: `I need the "${
							permissions[data.missing[0]]
						}" permission for the \`${this.name}\` command to run.`,
						color: 0xdc143c,
					});

				return message.embed({
					description: oneLine`
						I need the following permissions for the \`${this.name}\` command to work:
						${data.missing.map((perm) => permissions[perm]).join(', ')}
					`,
					color: 0xdc143c,
				});
			case 'throttling':
				return message.embed({
					title: 'You are on cooldown!',
					description: `You can use the \`${
						this.name
					}\` command for another ${data.remaining.toFixed(1)} seconds.`,
					color: 0xdc143c,
				});
			default:
				return null;
		}
	}

	/**
	 * @param {Error} err
	 * @param {import('discord.js-commando').CommandoMessage} message
	 * @param {Record<string, any>|string|string[]} args
	 * @param {boolean} fromPattern
	 * @param {?import('discord.js-commando').ArgumentCollectorResult} result
	 */
	onError(err, message, args, fromPattern, result) {
		return message.embed({
			title: 'An error occured...',
			description: `${err.name}: ${err.message}`,
			footer: 'Please contact Tomio#1265',
			color: 0xdc143c,
		});
	}
};
