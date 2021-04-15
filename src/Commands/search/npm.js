const { toPercent, formatBytes } = require('../../Structures/Util');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const moment = require('moment');

module.exports = class NPMCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'npm',
			aliases: ['npm-search'],
			group: 'search',
			memberName: 'npm',
			description: 'Searches NPMJS for your query.',
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'query',
					prompt: 'What is your query?',
					type: 'string',
					parse: (q) => encodeURIComponent(q),
				},
			],
			throttling: {
				usages: 5,
				duration: 15,
			},
		});
	}

	async run(msg, { query }) {
		const message = await msg.embed({ description: 'Fetching....' });

		const { body } = await request
			.get(`https://api.npms.io/v2/search`)
			.query({ q: query, size: 1 })
			.set({ 'User-Agent': 'TanakaBot 1.0.0 (https://github.com/1chiSensei/Tanaka)' });

		if (body.total === 0) return message.edit({ embed: { description: 'Could not find any results.' } });

		const { body: dat } = await request
			.get(`https://api.npms.io/v2/package/${body.results[0].name}`)
			.set({ 'User-Agent': 'TanakaBot 1.0.0 (https://github.com/1chiSensei/Tanaka)' });

		const maintainers = [];
		const dependencies = [];
		const devDependencies = [];
		const data = dat.collected.metadata;
		const { source, npm } = dat.collected;

		const depsMap = data.dependencies ?? null;
		const devDepsMap = data.devDependencies ?? null;

		if (depsMap !== null) for (const deps of Object.keys(depsMap)) dependencies.push(deps);
		if (devDepsMap !== null) for (const devDeps of Object.keys(devDepsMap)) devDependencies.push(devDeps);

		data.maintainers.forEach((p) => maintainers.push(p.username));

		const embed = new MessageEmbed()
			.setAuthor(
				'NPM',
				'https://github.com/PKief/vscode-material-icon-theme/raw/master/icons/npm.svg',
				'https://npmjs.com',
			)
			.setTitle(data.name)
			.setURL(data.links.npm)
			.setDescription(data.description)
			.addField('❯ Version', data.version ?? 'Unknown', true)
			.addField('❯ Author', data.author ? data.author.name : 'Unknown', true)
			.addField('❯ License', data.license ?? 'None', true)
			.addField('❯ Modification Date', moment(data.date).format('MMMM Do YYYY, h:mm:ss a'), true)
			.addField('❯ Dependents', npm.dependentsCount ?? '0', true)
			.addField('❯ README Size', formatBytes(source.files.readmeSize) ?? 'No README', true)
			.addField('❯ Quality', toPercent(dat.score.detail.quality), true)
			.addField('❯ Popularity', toPercent(dat.score.detail.popularity), true)
			.addField('❯ Maintenance', toPercent(dat.score.detail.maintenance), true)
			.addField('❯ Maintainers', maintainers.join(', ') ?? 'None')
			.addField('❯ Dependencies', dependencies.join(', ') ?? 'None')
			.addField('❯ Dev Dependencies', devDependencies.join(', ') ?? 'None')
			.setFooter(data.keywords.join('\n') ?? '')
			.setColor('#cb3837')
			.setTimestamp();

		return message.edit(embed);
	}
};
