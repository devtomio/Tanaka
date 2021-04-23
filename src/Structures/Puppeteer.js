const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const puppeteer = require('puppeteer-extra').default;

puppeteer.use(StealthPlugin());

const screenshot = async (url) => {
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox'],
		defaultViewport: {
			width: 1920,
			height: 1080,
		},
	});
	const page = await browser.newPage();

	await page.goto(url);

	const buffer = await page.screenshot({ type: 'png' });

	await browser.close();

	return buffer;
};

module.exports = { screenshot };
