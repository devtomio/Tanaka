const{ArgumentType:ArgumentType}=require("discord.js-commando"),sherlock=require("sherlockjs");module.exports=class SherlockType extends ArgumentType{constructor(e){super(e,"sherlock")}validate(e){return!!sherlock.parse(e).startDate||"Please provide a valid starting time."}parse(e){return sherlock.parse(e)}};
//# sourceMappingURL=sherlock.js.map
