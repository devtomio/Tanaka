const Command = require('../../Structures/Command');
const { stripIndents } = require('common-tags');
const { execSync } = require('child_process');

module.exports = class ExecCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'exec',
			aliases: ['execute', 'sh', '$'],
			group: 'util',
			memberName: 'exec',
			description: 'Executes a command line application.',
			details: 'Only the bot owner may use this command.',
			ownerOnly: true,
			guarded: true,
			args: [
				{
					key: 'command',
					prompt: 'What command do you want to execute?',
					type: 'string',
				},
			],
		});
	}

	run(msg, { command }) {
		const results = this.exec(command);

		return msg.reply(stripIndents`
			_${results.err ? 'An error occured.' : 'Successfully executed.'}_
			\`\`\`sh
			${results.std.length > 2000 ? `${results.std.substring(0, 1900)}...` : results.std}
			\`\`\`
		`);
	}

	exec(command) {
		try {
			const stdout = execSync(command, { timeout: 150000, encoding: 'utf-8' });

			return { err: false, std: stdout };
		} catch (err) {
			return { err: true, std: err.stderr };
		}
	}
};
