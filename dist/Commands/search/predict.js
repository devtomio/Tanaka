const{Command:Command}=require("discord.js-commando"),{stripIndents:stripIndents}=require("common-tags"),toPercent=require("decimal-to-percent");module.exports=class extends Command{constructor(t){super(t,{name:"predict",memberName:"predict",group:"search",description:"Check what the bot thinks about your message.",args:[{key:"words",label:"word/words",prompt:"What would you want the bot to analyze?",type:"string",max:1e3}],throttling:{duration:10,usages:2}})}async run(t,{words:e}){const r=await this.client.perspective.processMessage(e,{attributes:["TOXICITY","SEVERE_TOXICITY","IDENTITY_ATTACK","INSULT","PROFANITY","THREAT","SEXUALLY_EXPLICIT","FLIRTATION","LIKELY_TO_REJECT","OBSCENE","SPAM"],languages:["en"],doNotStore:!0,stripHtml:!0});return t.say(stripIndents`
			\`\`\`
			${e}
			\`\`\`

			\`\`\`css
			Toxicity: ${toPercent(r.TOXICITY)}
			Severe Toxicity: ${toPercent(r.SEVERE_TOXICITY)}
			Identity Attack: ${toPercent(r.IDENTITY_ATTACK)}
			Insult: ${toPercent(r.INSULT)}
			Profanity: ${toPercent(r.PROFANITY)}
			Threat: ${toPercent(r.THREAT)}
			Sexually Explicit: ${toPercent(r.SEXUALLY_EXPLICIT)}
			Flirtation: ${toPercent(r.FLIRTATION)}
			Likely To Reject: ${toPercent(r.LIKELY_TO_REJECT)}
			Obscene: ${toPercent(r.OBSCENE)}
			Spam: ${toPercent(r.SPAM)}
			\`\`\`
		`)}};
//# sourceMappingURL=predict.js.map
