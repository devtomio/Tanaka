const proxy = require('redbird')({
	port: 80,
	letsencrypt: {
		path: `${__dirname}/certs`,
		port: 9999,
	},
	ssl: {
		port: 443,
	},
});

proxy.register('tanaka-bot.me', 'http://localhost:3001', {
	ssl: {
		letsencrypt: {
			email: 'mail@tomio.codes',
		},
	},
});
