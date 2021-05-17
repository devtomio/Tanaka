const { BaseCluster: Cluster } = require('kurasuta');

module.exports = class BaseCluster extends Cluster {
	launch() {
		this.client.login(process.env.DISCORD_TOKEN);
	}
};
