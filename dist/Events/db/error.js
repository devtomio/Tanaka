const Event=require("../../Structures/Event");module.exports=class extends Event{constructor(...e){super(...e,"error",{emitter:"db"})}run(e){this.client.logger.error(e)}};
//# sourceMappingURL=error.js.map
