const assert = require('assert');
const puppeteer = require('puppeteer');
let browser;
let page;

before(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.setViewport({ width: 1580, height: 800 });
});

describe('App test', () => {
  it('1. has current app title', async () => {
    await page.goto(process.env.APP_LINK);
    await page.screenshot({
      path: process.env.APP_TEST_OUTPUT_PATH + 'app_1_home-page.png'
    });
    const title = await page.title();
    assert.strictEqual(title, process.env.APP_PAGE_TITLE);
  }).timeout(100000);
});

after(async () => {
  await browser.close();
});
