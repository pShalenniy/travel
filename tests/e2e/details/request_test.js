const assert = require('assert');
const puppeteer = require('puppeteer');
let browser;
let page;

before(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.setViewport({ width: 1580, height: 800 });
});

describe('Details Page Request', () => {
  it('1. has current hotel title', async () => {
    await page.goto(
      process.env.APP_LINK +
        '/destination/france/paris/4669670?checkin=2021-08-23&checkout=2021-08-27&corporation_id=277552&gdg_trip_id=7690606&dummyUid=' +
        process.env.VUE_APP_TEST_USER_UID
    );

    // close cookie
    await page.waitForSelector('.cookie .v-btn:last-child');
    await page.click('.cookie .v-btn:last-child');

    await page.waitForSelector('[data-test="details-title"]');
    const detailsTitle = await page.$eval(
      '[data-test="details-title"]',
      el => el.innerText
    );
    await page.screenshot({
      path: process.env.APP_TEST_OUTPUT_PATH + 'details_1_load_page.png'
    });
    assert.strictEqual(detailsTitle, 'Hôtel Parisianer');
  }).timeout(50000);

  it('2. has rooms', async () => {
    const firstRoom = await page.waitForSelector(
      '[data-test="details-room-choose"]'
    );
    await page.screenshot({
      path: process.env.APP_TEST_OUTPUT_PATH + 'details_2_has_room.png'
    });
    assert.ok(firstRoom);
  }).timeout(10000);

  it('3. choose room', async () => {
    await page.click('[data-test="details-room-choose"]');
    const requestedRoom = await page.waitForSelector(
      '[data-test="details-request-btn"]'
    );
    await page.waitForSelector('[data-test="details-request-btn"]');
    await page.screenshot({
      path: process.env.APP_TEST_OUTPUT_PATH + 'details_3_choose_room.png'
    });
    assert.ok(requestedRoom);
  }).timeout(10000);

  it('4. click request', async () => {
    await page.click('[data-test="details-request-btn"]');

    await page.screenshot({
      path: process.env.APP_TEST_OUTPUT_PATH + 'details_4_click_request.png'
    });
  }).timeout(4000);

  it('5. show confirmation page ', async () => {
    const confirmationTitle = await page.$eval(
      '[data-test="confirmation-title"]',
      el => el.innerText
    );

    await page.screenshot({
      path: process.env.APP_TEST_OUTPUT_PATH + 'details_5_confirmation_page.png'
    });

    assert.strictEqual(confirmationTitle, 'Thanks, request sent.');
  }).timeout(4000);
});

after(async () => {
  await browser.close();
});
