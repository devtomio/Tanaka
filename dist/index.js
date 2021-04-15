const{MongoDBProvider:MongoDBProvider}=require("commando-provider-mongo"),{MongoClient:MongoClient}=require("mongodb"),Client=require("./Structures/Client"),path=require("path"),client=new Client;client.setProvider(MongoClient.connect(client.db.url,{useUnifiedTopology:!0,useNewUrlParser:!0}).then((e=>new MongoDBProvider(e,"tanaka")))),client.registry.registerDefaultTypes().registerGroups([{id:"util",name:"Utility",guarded:!0},{id:"random",name:"Random Response"},{id:"info",name:"Information"},{id:"search",name:"Search"},{id:"remind",name:"Reminder"}]).registerDefaultGroups().registerDefaultCommands({unknownCommand:!1,help:!1,eval:!1,ping:!1}).registerTypesIn(path.join(__dirname,"Types")).registerCommandsIn(path.join(__dirname,"Commands")),client.once("ready",(async()=>{await client.timers.fetchAll();const e=[`${client.guilds.cache.reduce(((e,n)=>e+n.memberCount),0)} users`,`${client.registry.commands.size} commands`,`${client.guilds.cache.size} guilds`],n=`t!help | ${e[Math.floor(Math.random()*e.length)]}`;client.setInterval((()=>client.user.setActivity(n,{type:"WATCHING"})),3e4),client.logger.info(`Logged in as ${client.user.tag}.`)})),client.on("debug",client.logger.debug),client.on("error",(e=>client.logger.error(e.stack))),client.db.once("ready",(()=>client.logger.info("MongoDB is ready!"))),client.db.on("debug",client.logger.debug),client.db.on("error",(e=>client.logger.error(e.stack))),client.rss.on("item:new:anime",(e=>{client.testWebhook.send(JSON.stringify(e,null,2).length>2e3?`${JSON.stringify(e,null,2).substring(0,1997)}...`:JSON.stringify(e,null,2))})),client.login();
//# sourceMappingURL=index.js.map
