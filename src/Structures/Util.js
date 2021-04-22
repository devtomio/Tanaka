const request = require('node-superfetch');
const regex = require('url-regex');
const { GOOGLE_KEY } = process.env;

const escapeRegex = (str) => str.replace(/[|\\{}()[}^$+*?.]/g, '\\$&');

const isUrl = (url) => regex({ exact: true, strict: true }).test(url);

const toPercent = (int) => `${Math.round(parseInt(int) * 100)}%`;

const shorten = (text, maxLen = 2000) => (text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text);

const formatBytes = (bytes) => {
	if (bytes === 0) return '0 Bytes';

	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const i = Math.floor(Math.log(bytes) / Math.log(1024));

	return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
};

const trimArray = (arr, maxLen = 10) => {
	if (arr.length > maxLen) {
		const len = arr.length - maxLen;
		arr = arr.slice(0, maxLen);

		arr.push(`${len} more...`);
	}

	return arr;
};

const streamToArray = (stream) => {
	if (!stream.readable) return Promise.resolve([]);

	return new Promise((resolve, reject) => {
		const array = [];

		function cleanup() {
			/* eslint-disable no-use-before-define */
			stream.removeListener('data', onData);
			stream.removeListener('end', onEnd);
			stream.removeListener('error', onEnd);
			stream.removeListener('close', onClose);
			/* eslint-enable */
		}
		function onData(data) {
			array.push(data);
		}
		function onEnd(error) {
			if (error) reject(error);
			else resolve(array);

			cleanup();
		}
		function onClose() {
			resolve(array);

			cleanup();
		}
	});
};

const isUrlSafe = async (url) => {
	if (!isUrl(url)) return null;

	const { body } = await request
		.post('https://safebrowsing.googleapis.com/v4/threatMatches:find')
		.query({ key: GOOGLE_KEY })
		.send({
			client: {
				clientId: 'formal-era-284123',
			},
			threatInfo: {
				threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING'],
				platformTypes: ['ANY_PLATFORM'],
				threatEntryTypes: ['URL'],
				threatEntries: [{ url }],
			},
		});

	if (!body.matches) return true;

	return false;
};

const permissions = {
	ADMINISTRATOR: 'Administrator',
	VIEW_AUDIT_LOG: 'View Audit Log',
	MANAGE_GUILD: 'Manage Server',
	MANAGE_ROLES: 'Manage Roles',
	MANAGE_CHANNELS: 'Manage Channels',
	KICK_MEMBERS: 'Kick Members',
	BAN_MEMBERS: 'Ban Members',
	CREATE_INSTANT_INVITE: 'Create Instant Invite',
	CHANGE_NICKNAME: 'Change Nickname',
	MANAGE_NICKNAMES: 'Manage Nicknames',
	MANAGE_EMOJIS: 'Manage Emojis',
	MANAGE_WEBHOOKS: 'Manage Webhooks',
	VIEW_CHANNEL: 'View Channels',
	SEND_MESSAGES: 'Send Messages',
	SEND_TTS_MESSAGES: 'Send TTS Messages',
	MANAGE_MESSAGES: 'Manage Messages',
	EMBED_LINKS: 'Embed Links',
	ATTACH_FILES: 'Attach Files',
	READ_MESSAGE_HISTORY: 'Read Message History',
	MENTION_EVERYONE: 'Mention Everyone',
	USE_EXTERNAL_EMOJIS: 'Use External Emojis',
	ADD_REACTIONS: 'Add Reactions',
	CONNECT: 'Connect',
	SPEAK: 'Speak',
	MUTE_MEMBERS: 'Mute Members',
	DEAFEN_MEMBERS: 'Deafen Members',
	MOVE_MEMBERS: 'Move Members',
	USE_VAD: 'Use Voice Activity',
	PRIORITY_SPEAKER: 'Priority Speaker',
	VIEW_GUILD_INSIGHTS: 'View Server Insights',
	STREAM: 'Video',
	USE_SLASH_COMMANDS: 'Use Slash Commands',
	REQUEST_TO_SPEAK: 'Request to Speak',
};

const userFlags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	PARTNERED_SERVER_OWNER: 'Partnered Server Owner',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	VERIFIED_BOT: 'Verified Bot',
	EARLY_VERIFIED_BOT_DEVELOPER: 'Early Verified Bot Developer',
};

const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'No Role',
	ALL_MEMBERS: 'Everyone',
};

const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻',
};

const regions = {
	brazil: 'Brazil',
	europe: 'Europe',
	hongkong: 'Hong Kong',
	india: 'India',
	japan: 'Japan',
	russia: 'Russia',
	singapore: 'Singapore',
	southafrica: 'South Africa',
	sydney: 'Sydney',
	'us-central': 'US Central',
	'us-east': 'US East',
	'us-west': 'US West',
	'us-south': 'US South',
};

module.exports = {
	escapeRegex,
	formatBytes,
	trimArray,
	userFlags,
	filterLevels,
	verificationLevels,
	regions,
	permissions,
	toPercent,
	shorten,
	streamToArray,
	isUrl,
	isUrlSafe,
};
