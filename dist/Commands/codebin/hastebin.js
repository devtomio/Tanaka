const{Command:Command}=require("discord.js-commando"),request=require("node-superfetch");module.exports=class extends Command{constructor(e){super(e,{name:"sourcebin",group:"codebin",memberName:"sourcebin",description:"Uploades your code to pastebin.",args:[{key:"code",prompt:"What is the code that you want to upload?",type:"code"}]})}async run(e,{code:t}){const{body:o}=await request.post("https://hastebin.com/documents").send(t.code).set({"User-Agent":"TanakaBot (https://github.com/1chiSensei/Tanaka)","Content-Type":"text/plain"});return e.say(`The link to the code is: \`https://hastebin.com/${o.key}.txt\``)}};
//# sourceMappingURL=hastebin.js.map
