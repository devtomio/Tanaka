const Event=require("../../Structures/Event");module.exports=class extends Event{constructor(...t){super(...t,"trackStart",{emitter:"trackStart"})}run(t,e){this.client.channels.cache.get(t.textChannel).send(`Now playing: \`${e.title}\`, requested by ${e.requester.tag}`)}};
//# sourceMappingURL=trackStart.js.map
