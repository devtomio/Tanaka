const proxy = require('redbird')({ port: 80 });

proxy.register('tanaka-bot.me', 'http://localhost:3001', {
	ssl: {
		letsencrypt: {
			email: 'mail@tomio.codes',
		},
	},
});
