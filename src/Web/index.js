const { Client } = require('@2pg/oauth');
const express = require('express');
const cookies = require('cookies');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const app = express();
const client = new Client({
	id: process.env.CLIENT_ID,
	secret: process.env.CLIENT_SECRET,
	redirectURI: 'https://tanaka-production.up.railway.app/auth/callback',
	scopes: ['identify'],
});

// eslint-disable-next-line valid-jsdoc
/**
 *  @param {import('../Structures/Client')} c The client
 */
module.exports = (c) => {
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.text());
	app.use(cookies.express(['I', 'store', 'login', 'sessions.']));
	app.use(morgan('combined'));
	app.use('/static', express.static(path.join(__dirname, 'static')));

	app.set('view engine', 'ejs');
	app.set('trust proxy', true);
	app.set('json spaces', 8);
	app.set('views', path.join(__dirname, 'views'));

	app.get('/', async (req, res) => {
		const key = req.cookies.get('discordToken');

		const userCount = c.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString();
		const guildCount = c.guilds.cache.size.toLocaleString();
		const channelCount = c.channels.cache.size.toLocaleString();
		const commandCount = c.registry.commands.size.toLocaleString();
		const shardCount = c.shard.count.toLocaleString() || '1';
		const ping = Math.round(c.ws.ping);

		res.render('index', {
			data: key ? await client.getUser(key) : null,
			userCount,
			guildCount,
			channelCount,
			commandCount,
			shardCount,
			ping,
		});
	});

	app.get('/commands', async (req, res) => {
		const key = req.cookies.get('discordToken');

		res.render('commands', { data: key ? await client.getUser(key) : null });
	});

	app.get('/auth/login', (_, res) => res.redirect(302, client.authCodeLink.url));

	app.get('/auth/callback', async (req, res) => {
		if (req.cookies.get('discordToken')) return res.redirect(302, '/');

		const key = await client.getAccess(req.query.code.toString());

		res.cookie('discordToken', key).redirect('/');
	});

	app.get('/auth/logout', (_, res) => {
		res.clearCookie('discordToken', undefined);

		res.redirect(302, '/');
	});

	app.listen(process.env.PORT, () => c.logger.info('Website is online!'));
};
