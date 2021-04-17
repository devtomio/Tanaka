const{Command:Command}=require("discord.js-commando");module.exports=class extends Command{constructor(e){super(e,{name:"support",aliases:["support-server"],group:"info",memberName:"support",description:"Sends the support server of the bot."})}run(e){return e.embed({description:"https://discord.gg/zGvtAnGhdP"})}};
//# sourceMappingURL=support.js.map
