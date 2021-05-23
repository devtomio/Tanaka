const{Command:Command}=require("discord.js-commando"),{stripIndents:stripIndents}=require("common-tags"),{MessageEmbed:MessageEmbed}=require("discord.js"),request=require("node-superfetch");module.exports=class extends Command{constructor(e){super(e,{name:"source",aliases:["src"],memberName:"source",group:"info",description:"Gets the source code of the command.",guarded:!0,args:[{key:"command",prompt:"What is the command?",type:"command"}]})}async run(e,{command:s}){const{body:t}=await request.get(`https://api.github.com/repos/1chiSensei/Tanaka/contents/src/Commands/${s.group.name}/${s.name}.js`).query("ref","main").set("Accept","application/vnd.github.v3+json"),o=(new MessageEmbed).setTitle(t.name).setURL(t.html_url).setDescription(stripIndents`
				\`\`\`js
				${Buffer.from(t.content,"base64").toString("utf-8")}
				\`\`\`
			`).setColor("RANDOM").setFooter(`Requested by ${e.author.tag}`,e.author.displayAvatarURL({dynamic:!0})).setTimestamp();return e.embed(o)}};
//# sourceMappingURL=source.js.map
