const{Command:Command}=require("discord.js-commando"),{create:create}=require("sourcebin");module.exports=class extends Command{constructor(e){super(e,{name:"sourcebin",group:"codebin",memberName:"sourcebin",description:"Uploades your code to pastebin.",args:[{key:"code",prompt:"What is the code that you want to upload?",type:"code"}]})}async run(e,{code:o}){const t=await create([{content:o.code,language:"text"}],{title:"CodeBin",description:"Uploaded by TanakaBot <https://github.com/1chiSensei/Tanaka>"});return e.say(`The link to the code is: ${t.url}!`)}};
//# sourceMappingURL=sourcebin.js.map
