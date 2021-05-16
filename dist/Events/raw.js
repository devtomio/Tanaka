const Event=require("../Structures/Event");module.exports=class extends Event{constructor(...e){super(...e,"raw")}run(e){this.client.manager.updateVoiceState(e)}};
//# sourceMappingURL=raw.js.map
