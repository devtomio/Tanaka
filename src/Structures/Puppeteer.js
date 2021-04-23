const AdblockPlugin = require('puppeteer-extra-plugin-adblocker');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const puppeteer = require('puppeteer-extra');

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockPlugin());

const screenshot = async (url) => {
	const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
	const page = await browser.newPage();

	await page.setViewport({
		width: 1920,
		height: 1080,
	});
	await page.goto(url);

	const buffer = await page.screenshot();

	await browser.close();

	return buffer;
};

module.exports = { screenshot };
