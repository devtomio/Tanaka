const { Command } = require('discord.js-commando');

module.exports = class UnloadCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'unload',
			aliases: ['unload-command', 'unload-cmd'],
			group: 'util',
			memberName: 'unload',
			description: 'Unloads a command.',
			ownerOnly: true,
			guarded: true,
			args: [
				{
					key: 'command',
					prompt: 'Which command would you like to unload?',
					type: 'command',
				},
			],
		});
	}

	async run(msg, { command }) {
		command.unload();

		if (this.client.shard) {
			try {
				await this.client.shard.broadcastEval(`
					const ids = [${this.client.shard.shards.join(',')}];

					if (!this.shard.shards.some(id => ids.includes(id))) this.registry.commands.get('${command.name}').unload();
				`);
			} catch (err) {
				this.client.emit('warn', 'Error wehn broadcasting command unload to other shards.');
				this.client.emit('error', err);

				await msg.reply(
					`Unloaded \`${command.ame}\` command, but failed to unload on other shards.`,
				);

				return null;
			}
		}

		await msg.reply(`Unloaded \`${command.name}\` command${this.client.shard ? ' on all shards' : ''}.`);

		return null;
	}
};
