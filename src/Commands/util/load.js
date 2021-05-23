const { Command } = require('discord.js-commando');
const { access, constants } = require('fs');

module.exports = class LoadCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'load',
			aliases: ['load-command', 'load-cmd'],
			group: 'util',
			memberName: 'load',
			description: 'Loads a new command.',
			ownerOnly: true,
			guarded: true,
			args: [
				{
					key: 'command',
					prompt: 'Which command would you like to load?',
					validate: (val) =>
						new Promise((resolve) => {
							if (!val) return resolve(false);

							const split = val.split(':');

							if (split.length !== 2) return resolve(false);
							if (this.client.registry.findCommands(val).length > 0)
								return resolve('That command is already registered.');

							const cmdPath = this.client.registry.resolveCommandPath(
								split[0],
								split[1],
							);

							access(cmdPath, constants.R_OK, (err) =>
								err ? resolve(false) : resolve(true),
							);

							return null;
						}),
					parse: (val) => {
						const split = val.split(':');
						const cmdPath = this.client.registry.resolveCommandPath(
							split[0],
							split[1],
						);

						delete require.cache[cmdPath];

						return require(cmdPath);
					},
				},
			],
		});
	}

	async run(msg, { command }) {
		this.client.registry.registerCommand(command);

		const cmd = this.client.registry.commands.last();

		if (this.client.shard) {
			try {
				await this.client.shard.broadcastEval(`
					const ids = [${this.client.shard.shards.join(',')}];

					if (!this.shard.shards.some(id => ids.includes(id))) {
						const cmdPath = this.registry.resolveCommandPath('${cmd.groupID}', '${cmd.name}');

						delete require.cache[cmdPath];
						this.registry.registerCommand(require(cmdPath));
					}
				`);
			} catch (err) {
				this.client.emit('warn', 'Error when broadcasting command load to other shards.');
				this.client.emit('error', err);

				await msg.reply(`Loaded \`${cmd.name}\` command, but failed to load on other shards.`);

				return null;
			}
		}

		await msg.reply(`Loaded \`${cmd.name}\` command${this.client.shard ? ' on all shards' : ''}.`);

		return null;
	}
};
