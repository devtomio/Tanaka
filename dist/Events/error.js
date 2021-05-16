const Event=require("../Structures/Event");module.exports=class extends Event{constructor(...r){super(...r,"error")}run(r){this.client.logger.error(r)}};
//# sourceMappingURL=error.js.map
