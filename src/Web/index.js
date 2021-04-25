const { Client } = require('@2pg/oauth');
const express = require('express');
const cookies = require('cookies');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const app = express();
const client = new Client({
	id: process.env.CLIENT_ID,
	secret: process.env.CLIENT_SECRET,
	redirectURI: 'https://tanaka.1chi.tk/auth/callback',
	scopes: ['identify'],
});

// eslint-disable-next-line valid-jsdoc
/**
 *  @param {import('../Structures/Client')} c The client
 */
module.exports = (c) => {
	app.use(cors());
	app.use(helmet());
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
		const shardCount = c.shard ? c.shard.count.toLocaleString() : '1';
		const ping = Math.round(c.ws.ping);

		const data = key ? await client.getUser(key) : null;

		res.render('index', {
			data,
			userCount,
			guildCount,
			channelCount,
			commandCount,
			shardCount,
			ping,
		});
	});

	app.get('/invite', (_, res) =>
		res.redirect(
			302,
			'https://discord.com/api/oauth2/authorize?client_id=804605929944645672&permissions=641064257&redirect_uri=https%3A%2F%2Ftanaka.1chi.tk%2Fauth%2Fcallback&response_type=code&scope=identify%20bot',
		),
	);

	app.get('/discord', (_, res) => res.redirect(302, 'https://discord.gg/zGvtAnGhdP'));

	app.get('/github', (_, res) => res.redirect(302, 'https://github.com/1chiSensei/Tanaka'));

	app.get('/commands', async (req, res) => {
		const key = req.cookies.get('discordToken');

		res.render('commands', { data: key ? await client.getUser(key) : null });
	});

	app.get('/legal', async (req, res) => {
		const key = req.cookies.get('discordToken');

		res.render('legal', { data: key ? await client.getUser(key) : null });
	});

	app.get('/profile', async (req, res) => {
		const key = req.cookies.get('discordToken');

		res.render('profile', {
			data: key ? await client.getUser(key) : null,
			moment: require('moment'),
		});
	});

	app.get('/auth/login', (_, res) => res.redirect(302, client.authCodeLink.url));

	app.get('/auth/callback', async (req, res) => {
		if (req.cookies.get('discordToken')) return res.redirect(302, '/');

		const code = req.query.code.toString();
		const key = await client.getAccess(code);

		res.cookie('discordToken', key).redirect('/');
	});

	app.get('/auth/logout', (_, res) => {
		res.clearCookie('discordToken', undefined);

		res.redirect(302, '/');
	});

	app.listen(process.env.PORT || 3000, () => c.logger.info('Website is online!'));
};
