const AdblockPlugin=require("puppeteer-extra-plugin-adblocker").default,StealthPlugin=require("puppeteer-extra-plugin-stealth"),puppeteer=require("puppeteer-extra").default;puppeteer.use(StealthPlugin()),puppeteer.use(AdblockPlugin({blockTrackers:!0}));const screenshot=async e=>{try{const t=await puppeteer.launch({headless:!0,args:["--no-sandbox","--disable-gpu","--single-process"]}),a=await t.newPage();await a.setViewport({width:1920,height:1080}),await a.goto(e,{waitUntil:["load","domcontentloaded"]}),await a.waitForTimeout(5e3);const r=await a.screenshot(),o={title:await a.title(),buffer:r};return await t.close(),o}catch(e){throw new Error(e)}};module.exports={screenshot:screenshot};
//# sourceMappingURL=Puppeteer.js.map
