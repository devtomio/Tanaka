const { Command } = require('discord.js-commando');

module.exports = class ReloadCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'reload',
			aliases: ['reload-cmd', 'reload-command'],
			group: 'util',
			memberName: 'reload',
			description: 'Reloads a command or command group.',
			ownerOnly: true,
			guarded: true,
			args: [
				{
					key: 'cmdOrGrp',
					label: 'command/group',
					prompt: 'Which command or group would you like to reload?',
					type: 'group|command',
				},
			],
		});
	}

	async run(msg, { cmdOrGrp }) {
		const isCmd = Boolean(cmdOrGrp.groupID);

		cmdOrGrp.reload();

		if (this.client.shard) {
			try {
				await this.client.shard.broadcastEval(`
					const ids = [${this.client.shard.shards.join(',')}];

					if (!this.shard.shards.some(id => ids.includes(id))) this.registry.${isCmd ? 'commands' : 'groups'}.get('${
					isCmd ? cmdOrGrp.name : cmdOrGrp.id
				}').reload();
				`);
			} catch (err) {
				this.client.emit('warn', 'Error when broadcasting command reload to other shards.');
				this.client.emit('error', err);

				if (isCmd)
					await msg.reply(
						`Reloaded \`${cmdOrGrp.name}\` command, but failed to reload on other shards.`,
					);
				else
					await msg.reply(
						`Reloaded all of the commands in the \`${cmdOrGrp.name}\` group, but failed to reload on other shards.`,
					);

				return null;
			}
		}

		if (isCmd)
			await msg.reply(
				`Reloaded \`${cmdOrGrp.name}\` command${this.client.shard ? ' on all shards' : ''}.`,
			);
		else
			await msg.reply(
				`Reloaded all of the commands in the \`${cmdOrGrp.name}\` group${
					this.client.shard ? ' on all shards' : ''
				}.`,
			);

		return null;
	}
};
