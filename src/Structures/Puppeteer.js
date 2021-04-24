const AdblockPlugin = require('puppeteer-extra-plugin-adblocker');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const puppeteer = require('puppeteer-extra').default;

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockPlugin({ blockTrackers: true }));

const screenshot = async (url) => {
	try {
		const browser = await puppeteer.launch({
			headless: true,
			args: ['--no-sandbox'],
		});
		const page = await browser.newPage();

		await page.setViewport({
			width: 1920,
			height: 1080,
		});
		await page.goto(url);
		await page.waitForTimeout(5000);

		const buffer = await page.screenshot();
		const data = {
			title: await page.title(),
			buffer,
		};

		await browser.close();

		return data;
	} catch (e) {
		throw new Error(e);
	}
};

module.exports = { screenshot };
