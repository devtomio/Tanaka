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
		}, 1.8e6);
	}

	async ibl() {
		await request
			.post(`https://api.infinitybotlist.com/bot/${this.client.user.id}`)
			.set({
				authorization: process.env.IBL_KEY,
				'Content-Type': 'application/json',
			})
			.send({
				servers: this.client.guilds.cache.size,
				shards: this.client.shard ? this.client.shard.count : 1,
			});
	}
};
