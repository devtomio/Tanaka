const Event=require("../../Structures/Event");module.exports=class extends Event{constructor(...e){super(...e,"nodeConnect",{emitter:"manager"})}run(e){this.client.logger.info(`Node "${e.options.identifier}" connected.`)}};
//# sourceMappingURL=nodeConnect.js.map
