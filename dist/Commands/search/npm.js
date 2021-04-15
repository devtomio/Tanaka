const{toPercent:toPercent,formatBytes:formatBytes}=require("../../Structures/Util"),{Command:Command}=require("discord.js-commando"),{MessageEmbed:MessageEmbed}=require("discord.js"),request=require("node-superfetch"),moment=require("moment");module.exports=class NPMCommand extends Command{constructor(e){super(e,{name:"npm",aliases:["npm-search"],group:"search",memberName:"npm",description:"Searches NPMJS for your query.",clientPermissions:["EMBED_LINKS"],args:[{key:"query",prompt:"What is your query?",type:"string",parse:e=>encodeURIComponent(e)}],throttling:{usages:5,duration:15}})}async run(e,{query:n}){const t=await e.embed({description:"Fetching...."}),{body:s}=await request.get("https://api.npms.io/v2/search").query({q:n,size:1}).set({"User-Agent":"TanakaBot 1.0.0 (https://github.com/1chiSensei/Tanaka)"});if(0===s.total)return t.edit({embed:{description:"Could not find any results."}});const{body:o}=await request.get(`https://api.npms.io/v2/package/${s.results[0].name}`).set({"User-Agent":"TanakaBot 1.0.0 (https://github.com/1chiSensei/Tanaka)"}),a=[],i=[],r=[],d=o.collected.metadata,{source:c,npm:m}=o.collected,u=d.dependencies??null,l=d.devDependencies??null;if(null!==u)for(const e of Object.keys(u))i.push(e);if(null!==l)for(const e of Object.keys(l))r.push(e);d.maintainers.forEach((e=>a.push(e.username)));const p=(new MessageEmbed).setAuthor("NPM","https://github.com/PKief/vscode-material-icon-theme/raw/master/icons/npm.svg","https://npmjs.com").setTitle(d.name).setURL(d.links.npm).setDescription(d.description).addField("❯ Version",d.version??"Unknown",!0).addField("❯ Author",d.author?d.author.name:"Unknown",!0).addField("❯ License",d.license??"None",!0).addField("❯ Modification Date",moment(d.date).format("MMMM Do YYYY, h:mm:ss a")??"Unknown",!0).addField("❯ Dependents",m.dependentsCount??"0",!0).addField("❯ README Size",formatBytes(c.files.readmeSize)??"No README",!0).addField("❯ Quality",toPercent(o.score.detail.quality)??"Unknown",!0).addField("❯ Popularity",toPercent(o.score.detail.popularity)??"Unknown",!0).addField("❯ Maintenance",toPercent(o.score.detail.maintenance)??"Unknown",!0).addField("❯ Maintainers",a.join(", ")??"None").addField("❯ Dependencies",i.join(", ")??"None").addField("❯ Dev Dependencies",r.join(", ")??"None").setFooter(d.keywords.join("\n")??"No Keywords").setColor("#cb3837").setTimestamp();return t.edit(p)}};
//# sourceMappingURL=npm.js.map
