module.exports = {
	git: {
		commitMessage: 'build(release): release v${version}',
	},
	github: {
		release: true,
		assets: ['package.tgz', 'CHANGELOG.md'],
	},
	npm: {
		publish: false,
	},
	plugins: {
		'@release-it/conventional-changelog': {
			preset: 'angular',
			infile: 'CHANGELOG.md',
		},
	},
};
