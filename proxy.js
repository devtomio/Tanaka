const proxy = require('redbird')({
	port: 8080,
	ssl: {
		port: 443,
	},
	letsencrypt: {
		port: 9989,
		path: `${__dirname}/paths`,
	},
});

proxy.register('tanaka-bot.me', 'http://localhost:3001', {
	ssl: {
		letsencrypt: {
			email: 'mail@tomio.codes',
		},
	},
});
