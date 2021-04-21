const{createCanvas:createCanvas,loadImage:loadImage}=require("canvas"),{Command:Command}=require("discord.js-commando"),request=require("node-superfetch"),GIFEncoder=require("gifencoder"),path=require("path");module.exports=class extends Command{constructor(e){super(e,{name:"triggered",group:"img",memberName:"triggered",description:"Applies the triggered effect to an image.",throttling:{usages:1,duration:10},clientPermissions:["ATTACH_FILES"],args:[{key:"image",prompt:"What image would you like to edit?",type:"image",default:e=>e.author.displayAvatarURL({format:"png",size:4096})}]})}async run(e,{image:a}){try{const{body:t}=await request.get(a),r=await loadImage(path.join(__dirname,"..","..","Assets","image","triggered.png")),o=await loadImage(t),n=new GIFEncoder(256,310);n.start(),n.setRepeat(0),n.setDelay(15);const i=createCanvas(256,310).getContext("2d"),s=30,d=20;let m=0;for(;m<9;)i.clearRect(0,0,256,310),i.drawImage(o,Math.floor(Math.random()*s)-s,Math.floor(Math.random()*s)-s,256+s,256+s),i.fillStyle="##FF000033",i.fillRect(0,0,256,310),i.drawImage(r,Math.floor(Math.random()*d)-d,256+Math.floor(Math.random()*d)-d,256+d,54+d),n.addFrame(i),m++;n.finish();const g=n.out.getData();return Buffer.byteLength(g)>8e6?e.reply("Resulting image was above 8 MB."):e.say({files:[{attachment:g,name:"triggered.gif"}]})}catch(a){return e.reply(`An error occured: \`${a.message}\`.`)}}};
//# sourceMappingURL=triggered.js.map
