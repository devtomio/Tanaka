const{BaseCluster:Cluster}=require("kurasuta");module.exports=class extends Cluster{launch(){this.client.login(process.env.DISCORD_TOKEN)}};
//# sourceMappingURL=BaseCluster.js.map
