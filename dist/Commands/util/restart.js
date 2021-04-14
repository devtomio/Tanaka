const{Command:Command}=require("discord.js-commando");module.exports=class RestartCommand extends Command{constructor(e){super(e,{name:"restart",aliases:["rs"],group:"util",memberName:"restart",ownerOnly:!0,guarded:!0,description:"Restarts the bot.",details:"Only the bot owner may use this command."})}async run(e){await e.say("Byee!"),process.exit()}};
//# sourceMappingURL=restart.js.map
