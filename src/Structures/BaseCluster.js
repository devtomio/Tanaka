const { BaseCluster } = require('kurasuta');

module.exports = class extends BaseCluster {
	launch() {
		this.client.login(process.env.DISCORD_TOKEN);
	}
};