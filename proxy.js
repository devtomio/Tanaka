const proxy = require('redbird')({
	port: 80,
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
