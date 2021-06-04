const { MessageEmbed, WebhookClient } = require('discord.js');
const manifest = require('./manifest.json');
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
	redirectURI: 'https://tanaka-bot.me/auth/callback',
	scopes: ['identify'],
});
const port = 3001;
const hook = new WebhookClient(process.env.VOTE_ID, process.env.VOTE_TOKEN);

// eslint-disable-next-line valid-jsdoc
/**
 *  @param {import('../Structures/Client')} c The client
 */
module.exports = (c) => {
	app.use(cors());
	app.use(helmet({ contentSecurityPolicy: false, frameguard: false }));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.text());
	app.use(cookies.express(['I', 'store', 'login', 'sessions.']));
	app.use(morgan('combined'));
	app.use((_, res, next) => {
		res.header('Service-Worker-Allowed', '/');
		next();
	});
	app.use('/static', express.static(path.join(__dirname, 'static')));

	app.set('view engine', 'ejs');
	app.set('trust proxy', true);
	app.set('json spaces', 8);
	app.set('views', path.join(__dirname, 'views'));

	app.get('/', async (req, res) => {
		const key = req.cookies.get('discordToken');

		const userCount = (await c.userCount()).toLocaleString();
		const guildCount = (await c.guildCount()).toLocaleString();
		const channelCount = (await c.channelCount()).toLocaleString();
		const usesCount = (await c.db.get('commandUses')).toLocaleString();
		const commandCount = c.registry.commands.size.toLocaleString();
		const shardCount = c.shard ? c.shard.shardCount.toLocaleString() : '1';
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
			usesCount,
		});
	});

	app.get('/invite', (_, res) =>
		res.redirect(
			302,
			'https://discord.com/api/oauth2/authorize?client_id=804605929944645672&permissions=379968&redirect_uri=https%3A%2F%2Ftanaka-bot.me%2Fauth%2Fcallback&response_type=code&scope=identify%20bot',
		),
	);

	app.get('/discord', (_, res) => res.redirect(302, 'https://discord.gg/zGvtAnGhdP'));

	app.get('/github', (_, res) => res.redirect(302, 'https://github.com/1chiSensei/Tanaka'));

	app.get('/commands', async (req, res) => {
		const key = req.cookies.get('discordToken');

		res.render('commands', {
			data: key ? await client.getUser(key) : null,
			commands: c.generateCommandList(),
		});
	});

	app.get('/legal', async (req, res) => {
		const key = req.cookies.get('discordToken');

		res.render('legal', { data: key ? await client.getUser(key) : null });
	});

	app.get('/vote', (_, res) => res.render('vote'));

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

	app.post('/vote/ibl', async (req, res) => {
		if (req.header('Authorization') !== process.env.VOTE_AUTH) {
			if (req.cookies.get('discordToken')) return res.sendStatus(403);
			return res.sendStatus(401);
		}

		const { userID } = req.body;
		const user = await c.users.fetch(userID);
		const embed = new MessageEmbed()
			.setTitle('New Vote!')
			.setURL('https://infinitybotlist.com/bots/804605929944645672')
			.setThumbnail(user.displayAvatarURL({ dynamic: true, size: 4096 }))
			.setDescription(`Thank you, ${user.tag}, for voting for Tanaka in Infinity Bot List!`)
			.setColor('RANDOM')
			.setFooter('infinitybotlist.com')
			.setTimestamp();

		await hook.send(embed);

		res.sendStatus(201);
	});

	app.get('/manifest.json', (_, res) => res.status(200).json(manifest));

	app.get('/serviceWorker.js', (_, res) =>
		res.status(200).sendFile(path.join(__dirname, 'static', 'serviceWorker.js')),
	);

	app.listen(port, () => c.logger.info(`Listening on localhost:${port}`));
};
