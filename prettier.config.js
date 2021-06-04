module.exports = {
	printWidth: 120,
	useTabs: true,
	singleQuote: true,
	quoteProps: 'as-needed',
	trailingComma: 'all',
	endOfLine: 'lf',
	tabWidth: 8,
	overrides: [
		{
			files: '*.ejs',
			options: {
				parser: 'html',
			},
		},
	],
};
