const{Command:Command}=require("discord.js-commando"),{stripIndents:stripIndents}=require("common-tags"),{execSync:execSync}=require("child_process");module.exports=class ExecCommand extends Command{constructor(e){super(e,{name:"exec",aliases:["execute","sh","$"],group:"util",memberName:"exec",description:"Executes a command line application.",details:"Only the bot owner may use this command.",ownerOnly:!0,guarded:!0,args:[{key:"command",prompt:"What command do you want to execute?",type:"string"}]})}run(e,{command:t}){const r=this.exec(t);return e.reply(stripIndents`
			_${r.err?"An error occured.":"Successfully executed."}_
			\`\`\`sh
			${r.std.length>2e3?`${r.std.substring(0,1900)}...`:r.std}
			\`\`\`
		`)}exec(e){try{return{err:!1,std:execSync(e,{timeout:15e4,encoding:"utf-8"}).trim()}}catch(e){return{err:!0,std:e.stderr.trim()}}}};
//# sourceMappingURL=exec.js.map
