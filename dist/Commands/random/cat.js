const{Command:Command}=require("discord.js-commando"),{MessageEmbed:MessageEmbed}=require("discord.js"),request=require("node-superfetch");module.exports=class CatCommand extends Command{constructor(e){super(e,{name:"cat",aliases:["random-cat"],group:"random",memberName:"cat",description:"Responds with a random cat image.",clientPermissions:["EMBED_LINKS"],throttling:{usages:5,duration:15}})}async run(e){const t=await e.embed({description:"Fetching...."}),{body:a}=await request.get("https://cataas.com/cat?json=true").set({"User-Agent":"TanakaBot 1.0.0 (https://github.com/1chiSensei/Tanaka)"}),s=(new MessageEmbed).setImage(`https://catass.com${a.url}`).setFooter(`Requested by ${e.author.tag}`,e.author.displayAvatarURL({dynamic:!0,size:4096})).setColor("RANDOM").setTimestamp();return t.edit(s)}};
//# sourceMappingURL=cat.js.map
