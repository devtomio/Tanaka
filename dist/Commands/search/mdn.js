const{Command:Command}=require("discord.js-commando"),{MessageEmbed:MessageEmbed}=require("discord.js"),request=require("node-superfetch");module.exports=class extends Command{constructor(e){super(e,{name:"mdn",group:"search",memberName:"mdn",description:"Searches MDN for your query.",clientPermissions:["EMBED_LINKS"],args:[{key:"query",prompt:"What article would you like to search for?",type:"string",parse:e=>e.replaceAll("#",".prototype.")}]})}async run(e,{query:r}){try{const{body:s}=await request.get("https://developer.mozilla.org/en-US/search.json").query({q:r,locale:"en-US",highlight:!1});if(!s.documents.length)return e.say("Couldn't find any results.");const t=s.documents[0],o=(new MessageEmbed).setColor("#0881ba").setAuthor("MDN","https://i.imgur.com/f0uC4b8.png","https://developer.mozilla.org").setURL(t.url).setTitle(t.title).setDescription(t.excerpt);return e.embed(o)}catch(r){return e.reply(`An error occured: \`${r.message}\`.`)}}};
//# sourceMappingURL=mdn.js.map
