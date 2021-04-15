const escapeRegex=e=>e.replace(/[|\\{}()[}^$+*?.]/g,"\\$&"),toPercent=e=>`${Math.round(100*parseInt(e))}%`,formatBytes=e=>{if(0===e)return"0 Bytes";const E=Math.floor(Math.log(e)/Math.log(1024));return`${parseFloat((e/Math.pow(1024,E)).toFixed(2))} ${["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][E]}`},trimArray=(e,E=10)=>{if(e.length>E){const s=e.length-E;(e=e.slice(0,E)).push(`${s} more...`)}return e},permissions={ADMINISTRATOR:"Administrator",VIEW_AUDIT_LOG:"View Audit Log",MANAGE_GUILD:"Manage Server",MANAGE_ROLES:"Manage Roles",MANAGE_CHANNELS:"Manage Channels",KICK_MEMBERS:"Kick Members",BAN_MEMBERS:"Ban Members",CREATE_INSTANT_INVITE:"Create Instant Invite",CHANGE_NICKNAME:"Change Nickname",MANAGE_NICKNAMES:"Manage Nicknames",MANAGE_EMOJIS:"Manage Emojis",MANAGE_WEBHOOKS:"Manage Webhooks",VIEW_CHANNEL:"View Channels",SEND_MESSAGES:"Send Messages",SEND_TTS_MESSAGES:"Send TTS Messages",MANAGE_MESSAGES:"Manage Messages",EMBED_LINKS:"Embed Links",ATTACH_FILES:"Attach Files",READ_MESSAGE_HISTORY:"Read Message History",MENTION_EVERYONE:"Mention Everyone",USE_EXTERNAL_EMOJIS:"Use External Emojis",ADD_REACTIONS:"Add Reactions",CONNECT:"Connect",SPEAK:"Speak",MUTE_MEMBERS:"Mute Members",DEAFEN_MEMBERS:"Deafen Members",MOVE_MEMBERS:"Move Members",USE_VAD:"Use Voice Activity",PRIORITY_SPEAKER:"Priority Speaker",VIEW_GUILD_INSIGHTS:"View Server Insights",STREAM:"Video",USE_SLASH_COMMANDS:"Use Slash Commands",REQUEST_TO_SPEAK:"Request to Speak"},userFlags={DISCORD_EMPLOYEE:"Discord Employee",PARTNERED_SERVER_OWNER:"Partnered Server Owner",HYPESQUAD_EVENTS:"HypeSquad Events",BUGHUNTER_LEVEL_1:"Bug Hunter (Level 1)",HOUSE_BRAVERY:"House of Bravery",HOUSE_BRILLIANCE:"House of Brilliance",HOUSE_BALANCE:"House of Balance",EARLY_SUPPORTER:"Early Supporter",TEAM_USER:"Team User",SYSTEM:"System",BUGHUNTER_LEVEL_2:"Bug Hunter (Level 2)",VERIFIED_BOT:"Verified Bot",EARLY_VERIFIED_BOT_DEVELOPER:"Early Verified Bot Developer"},filterLevels={DISABLED:"Off",MEMBERS_WITHOUT_ROLES:"No Role",ALL_MEMBERS:"Everyone"},verificationLevels={NONE:"None",LOW:"Low",MEDIUM:"Medium",HIGH:"(╯°□°）╯︵ ┻━┻",VERY_HIGH:"┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻"},regions={brazil:"Brazil",europe:"Europe",hongkong:"Hong Kong",india:"India",japan:"Japan",russia:"Russia",singapore:"Singapore",southafrica:"South Africa",sydney:"Sydney","us-central":"US Central","us-east":"US East","us-west":"US West","us-south":"US South"};module.exports={escapeRegex:escapeRegex,formatBytes:formatBytes,trimArray:trimArray,userFlags:userFlags,filterLevels:filterLevels,verificationLevels:verificationLevels,regions:regions,permissions:permissions,toPercent:toPercent};
//# sourceMappingURL=Util.js.map
