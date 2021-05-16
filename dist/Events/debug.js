const Event=require("../Structures/Event");module.exports=class extends Event{constructor(...e){super(...e,"debug")}run(e){this.client.logger.debug(e)}};
//# sourceMappingURL=debug.js.map
