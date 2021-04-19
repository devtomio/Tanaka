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

	res.render('index', { data: key ? await client.getUser(key) : null });
});

app.get('/commands', async (req, res) => {
	const key = req.cookies.get('discordToken');

	res.render('commands', { data: key ? await client.getUser(key) : null });
});

app.get('/auth/login', (_, res) => res.redirect(302, client.authCodeLink.url));

app.get('/auth/callback', async (req, res) => {
	const key = await client.getAccess(req.query.code.toString());

	res.cookie('discordToken', key).redirect('/');
});

app.get('/auth/logout', (_, res) => {
	res.clearCookie('discordToken', undefined);

	res.redirect(302, '/');
});

module.exports = () => app.listen(process.env.PORT, () => console.log('Website is ready!'));
