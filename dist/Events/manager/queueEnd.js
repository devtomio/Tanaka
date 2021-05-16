const Event=require("../../Structures/Event"),{MessageEmbed:MessageEmbed}=require("discord.js");module.exports=class extends Event{constructor(...e){super(...e,"queueEnd",{emitter:"manager"})}run(e){const s=this.client.channels.cache.get(e.textChannel),t=new MessageEmbed({description:"The queue has ended.",color:"RANDOM"});s.send(t),e.destroy()}};
//# sourceMappingURL=queueEnd.js.map
