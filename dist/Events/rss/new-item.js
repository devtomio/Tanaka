const{WebhookClient:WebhookClient,MessageEmbed:MessageEmbed}=require("discord.js"),Event=require("../../Structures/Event"),{htmlToText:htmlToText}=require("html-to-text");module.exports=class extends Event{constructor(...e){super(...e,"item:new:anime",{emitter:"rss"})}run(e){this.client.guilds.cache.forEach((async t=>{t.available||(t=await t.fetch());const s=await this.client.db.get(`animeUpdates-${t.id}`);if(null===s)return!1;const i=new WebhookClient(s.id,s.token),n=(new MessageEmbed).setTitle(`**${e.title}**`).setDescription(htmlToText(e.description)).setURL(e.link).setColor("RANDOM").setImage("https://i.imgur.com/R3JCtNK.jpg").setTimestamp();i.send(n)}))}};
//# sourceMappingURL=new-item.js.map