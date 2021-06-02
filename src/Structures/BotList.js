const request = require('node-superfetch');

module.exports = class BotList {
	// eslint-disable-next-line valid-jsdoc
	/**
	 * @param {import('./Client')} client the client
	 */
	constructor(client) {
		this.client = client;

		setInterval(async () => {
			await this.ibl();
			await this.discordBotsGG();
			await this.discordExtremeList();
			await this.pbl();
		}, 1.8e6);
	}

	async ibl() {
		const body = {
			servers: await this.client.guildCount(),
			shards: this.client.shard ? this.client.shard.shardCount : 1,
		};

		await request
			.post(`https://api.infinitybotlist.com/bot/${this.client.user.id}`)
			.set({
				authorization: process.env.IBL_KEY,
				'Content-Type': 'application/json',
			})
			.send(JSON.stringify(body));
	}

	async discordBotsGG() {
		const body = {
			guildCount: await this.client.guildCount(),
			shardCount: this.client.shard ? this.client.shard.shardCount : 1,
		};

		await request
			.post(`https://discord.bots.gg/api/v1/bots/${this.client.user.id}/stats`)
			.set({
				Authorization: process.env.DISCORD_BOTS_GG_KEY,
				'Content-Type': 'application/json',
			})
			.send(JSON.stringify(body));
	}

	async discordExtremeList() {
		const body = {
			guildCount: await this.client.guildCount(),
			shardCount: this.client.shard?.shardCount ?? 1,
		};

		await request
			.post(`https://api.discordextremelist.xyz/v2/bot/${this.client.user.id}/stats`)
			.set({
				Authorization: process.env.DISCORD_EXTREME_LIST_KEY,
				'Content-Type': 'application/json',
			})
			.send(JSON.stringify(body));
	}

	async pbl() {
		const body = {
			server_count: await this.client.guildCount(),
			shard_count: this.client.shard?.shardCount ?? 1,
		};

		await request
			.post(`https://paradisebots.net/api/v1/bot/${this.client.user.id}`)
			.set({
				Authorization: process.env.PARADISEBOTS_KEY,
				'Content-Type': 'application/json',
			})
			.send(JSON.stringify(body));
	}
};
