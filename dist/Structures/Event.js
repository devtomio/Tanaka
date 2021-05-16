module.exports=class{constructor(t,e,n={}){this.name=e,this.client=t,this.type=n.once?"once":"on",this.emitter=("string"==typeof n.emitter?this.client[n.emitter]:n.emitter)||this.client}async run(...t){throw new Error(`The run method has not been implemented in ${this.constructor.name}.`)}};
//# sourceMappingURL=Event.js.map
