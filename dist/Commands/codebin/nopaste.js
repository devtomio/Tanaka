const{Command:Command}=require("discord.js-commando"),{execSync:execSync}=require("child_process");module.exports=class extends Command{constructor(e){super(e,{name:"nopaste",group:"codebin",memberName:"nopaste",description:"Uploades your code to https://nopaste.ml.",args:[{key:"code",prompt:"What is the code that you want to upload?",type:"code"}]})}async run(e,{code:o}){const t=execSync(`echo -n '${o.code}' | lzma | base64 -w0 | xargs -0 printf "https://nopaste.ml/#%s\\n"`,{timeout:1e5,encoding:"utf-8"});return e.embed({description:`The link to the code is [\`here\`](${t.trim()})!`})}};
//# sourceMappingURL=nopaste.js.map