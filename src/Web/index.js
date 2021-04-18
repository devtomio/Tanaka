const OAuthClient = require('disco-oauth');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const app = express();
const client = new OAuthClient(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
	.setRedirect('https://tanaka-production.up.railway.app/auth/callback')
	.setScopes('identify');

const uri =
	'https://discord.com/api/oauth2/authorize?client_id=804605929944645672&redirect_uri=https%3A%2F%2Ftanaka-production.up.railway.app%2Fauth%2Fcallback&response_type=code&scope=identify';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(morgan('combined'));

app.set('view engine', 'ejs');
app.set('trust proxy', true);
app.set('json spaces', 8);
app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) => {
	if (req.cookies.discordToken)
		return res.status(200).render('index', { data: await client.getUser(req.cookies.discordToken) });

	return res.status(200).render('index', { data: null });
});

app.get('/auth/login', (req, res) => {
	if (req.cookies.discordToken) return res.redirect(302, '/');

	return res.redirect(302, uri);
});

app.get('/auth/callback', async (req, res) => {
	if (req.cookies.discordToken) return res.redirect(302, '/');

	const accessCode = req.query.code;
	const accessToken = await client.getAccess(accessCode);

	res.cookie('discordToken', accessToken, { maxAge: 604800000 });

	return res.redirect(302, '/');
});

app.get('/auth/logout', (_, res) => {
	res.cookie('discordToken', null, { maxAge: -1 });

	return res.redirect(302, '/');
});

module.exports = () => app.listen(process.env.PORT, () => console.log('Website is ready!'));
