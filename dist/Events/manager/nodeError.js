const Event=require("../../Structures/Event");module.exports=class extends Event{constructor(...e){super(...e,"nodeError",{emitter:"manager"})}run(e,r){this.client.logger.error(`Node "${e.options.identifier}" encountered an error: ${r.message}.`)}};
//# sourceMappingURL=nodeError.js.map
