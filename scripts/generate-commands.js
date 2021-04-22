const client = require('../src/index');
const path = require('path');
const fs = require('fs');

const list = client.registry.groups.map((g) => {
	const commands = g.commands.filter((c) => !c.hidden);
	return `\n### ${g.name}:\n\n${commands
		.map((c) => {
			const extra = `${c.ownerOnly ? ' (Owner-Only)' : ''}${c.nsfw ? ' (NSFW)' : ''}`;
			return `* **${c.name}:** ${c.description}${extra}`;
		})
		.join('\n')}`;
});
const text = `Total: ${client.registry.commands.size}\n${list.join('\n')}`;

fs.writeFileSync(path.join(__dirname, '..', 'commands.txt'), Buffer.from(text));

process.exit(0);
