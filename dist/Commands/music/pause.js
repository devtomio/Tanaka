const{Command:Command}=require("discord.js-commando");module.exports=class extends Command{constructor(e){super(e,{name:"pause",aliases:["pause-music"],group:"music",memberName:"pause",description:"Pauses the music queue.",guildOnly:!0})}run(e){const s=this.client.manager.get(e.guild.id);if(!s)return e.reply("There is no player for this guild.");const{channel:n}=e.member.voice;return n?n.id!==s.voiceChannel?e.reply("You're not in the same voice channel as me!"):s.paused?e.reply("The queue is already paused."):(s.pause(!0),e.reply("Stopped the player.")):e.reply("You need to join a voice channel.")}};
//# sourceMappingURL=pause.js.map