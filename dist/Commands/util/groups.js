const{Command:Command}=require("discord.js-commando"),{stripIndents:stripIndents}=require("common-tags");module.exports=class extends Command{constructor(s){super(s,{name:"groups",aliases:["list-groups","show-groups"],group:"util",memberName:"groups",description:"Lists all command groups.",guarded:!0})}run(s){return s.reply(stripIndents`
			__**Groups**__
			${this.client.registry.groups.map((r=>`**${r.name}:** ${r.isEnabledIn(s.guild)?"Enabled":"Disabled"}`)).join("\n")}
		`)}};
//# sourceMappingURL=groups.js.map
