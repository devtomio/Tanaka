const AdblockPlugin = require('puppeteer-extra-plugin-adblocker').default;
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const puppeteer = require('puppeteer-extra').default;

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockPlugin({ blockTrackers: true }));

const screenshot = async (url) => {
	try {
		const headers = {
			'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,de;q=0.6,it;q=0.5',
			'accept-encoding': 'gzip, deflate, br',
			accept:
				'text/html,application/xhtml+xml,application/json,text/plain,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
		};

		const browser = await puppeteer.launch({
			headless: true,
			args: ['--no-sandbox', '--disable-gpu', '--single-process', '--disable-dev-shm-usage'],
		});
		const page = await browser.newPage();

		await page.setViewport({
			width: 1920,
			height: 1080,
		});
		await page.setExtraHTTPHeaders(headers);
		await page.goto(url, { waitUntil: ['load', 'domcontentloaded'] });
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
