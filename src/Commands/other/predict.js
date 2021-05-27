const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const toPercent = require('decimal-to-percent');

module.exports = class PredictCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'predict',
			memberName: 'predict',
			group: 'other',
			description: 'Check what the bot thinks about your message.',
			args: [
				{
					key: 'words',
					label: 'word/words',
					prompt: 'What would you want the bot to analyze?',
					type: 'string',
					max: 1000,
				},
			],
			throttling: {
				duration: 10,
				usages: 2,
			},
		});
	}

	async run(msg, { words }) {
		const scores = await this.client.perspective.processMessage(words, {
			attributes: [
				'TOXICITY',
				'SEVERE_TOXICITY',
				'IDENTITY_ATTACK',
				'INSULT',
				'PROFANITY',
				'THREAT',
				'SEXUALLY_EXPLICIT',
				'FLIRTATION',
				'LIKELY_TO_REJECT',
				'OBSCENE',
				'SPAM',
			],
			languages: ['en'],
			doNotStore: true,
			stripHtml: true,
		});

		return msg.say(stripIndents`
			\`\`\`
			${words}
			\`\`\`

			\`\`\`css
			Toxicity: ${toPercent(scores.TOXICITY)}
			Severe Toxicity: ${toPercent(scores.SEVERE_TOXICITY)}
			Identity Attack: ${toPercent(scores.IDENTITY_ATTACK)}
			Insult: ${toPercent(scores.INSULT)}
			Profanity: ${toPercent(scores.PROFANITY)}
			Threat: ${toPercent(scores.THREAT)}
			Sexually Explicit: ${toPercent(scores.SEXUALLY_EXPLICIT)}
			Flirtation: ${toPercent(scores.FLIRTATION)}
			Likely To Reject: ${toPercent(scores.LIKELY_TO_REJECT)}
			Obscene: ${toPercent(scores.OBSCENE)}
			Spam: ${toPercent(scores.SPAM)}
			\`\`\`
		`);
	}
};
