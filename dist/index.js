const{ShardingManager:ShardingManager}=require("kurasuta"),Client=require("./Structures/Client"),logger=require("./Structures/Logger"),{join:join}=require("path"),manager=new ShardingManager(join(__dirname,"Structures","BaseCluster"),{token:process.env.DISCORD_TOKEN,client:Client,shardCount:2,ipcSocket:9454,timeout:6e4});manager.spawn().then((()=>logger.info(`Spawning shard. Shard count: ${manager.shardCount}`))).catch((r=>logger.error(`Spawing error: REASON = ${r}`)));
//# sourceMappingURL=index.js.map
