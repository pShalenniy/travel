const assert = require('assert');
const puppeteer = require('puppeteer');
let browser;
let page;

before(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.setViewport({ width: 1580, height: 800 });
});

describe('Destination Page Search', () => {
  it('1. has current destination title', async () => {
    await page.goto(
      process.env.APP_LINK +
        '/destination?mlt=6F50064C219DEB09F8EAC49D0B43A36EA8A055388D46522C82A4C49A75F1D7CF59427ACE54BE856B94DEC911413726BE28C9742945B644106219A1A6392B6FA43723F3E781A880966143592EE36C482DBD2F6CE1E50A5267109FC3B929ECE9059478E0CD96EC25D9CB9E6133F6C6CB1EDED2123B7E6BB2CAFC6946C9E36C3E9D7CFF3FE90157E5BB12CEAA7DD3F319BB74C67804BCFA5490EF4045E7B526F7C6CA650EDBFA45B3BAF350D3EABE47153993AED2FF177A215CF270B4D2A303A544A4FC1802C7DFCF4AD6D793ECE12B6751BDBE15ED40F652C88AD260F312B047D1C741F29724779F9F0585F51D13452C90'
    );

    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    const destinationTitle = await page.$eval(
      '[data-test="page-title"]',
      el => el.innerText
    );
    assert.strictEqual(destinationTitle, 'Amsterdam');
    await page.screenshot({
      path: process.env.APP_TEST_OUTPUT_PATH + 'destination-search_1_load_page.png'
    });
  }).timeout(40000);

  it('2. open filter', async () => {
    await page.click('.hero-panel [data-test="location-filter-toggle"]');
    const filterItemLocation = await page.$(
      '[data-test="destination-filter-location"]'
    );
    await page.waitFor(1000);
    await page.screenshot({
      path: process.env.APP_TEST_OUTPUT_PATH + 'destination-search_2_open-filter.png'
    });
    assert.ok(filterItemLocation);
  }).timeout(4000);

  it('3. change destionation', async () => {
    await page.type(
      '[data-test="destination-filter-location"] input',
      'Paris, France'
    );
    await page.waitForSelector('.v-autocomplete__content .v-list-item__title');
    await page.click('.v-autocomplete__content .v-list-item__title');
    await page.screenshot({
      path: process.env.APP_TEST_OUTPUT_PATH + 'destination-search_3_change_destionation.png'
    });
  }).timeout(4000);

  it('4. change dates', async () => {
    await page.click('[data-test="destination-filter-dates"]');
    await page.click(
      '.v-menu__content .v-date-picker-table .v-btn:not(.v-btn--active):not(.v-btn--disabled)'
    );
    await page.click(
      '.v-menu__content .v-date-picker-table .v-btn:not(.v-btn--active):not(.v-btn--disabled)'
    );
    await page.click('.v-menu__content .range-picker__footer .v-btn');
    await page.screenshot({
      path: process.env.APP_TEST_OUTPUT_PATH + 'destination-search_4_change_dates.png'
    });
  }).timeout(4000);

  it('5. submit search', async () => {
    await page.click('[data-test="destination-filter-submit"]');
    const firstCard = await page.waitForSelector(
      '[data-test="destination-results-card"]'
    );
    await page.waitFor(1000);
    await page.screenshot({
      path: process.env.APP_TEST_OUTPUT_PATH + 'destination-search_5_submit_search.png'
    });
    assert.ok(firstCard);
  }).timeout(40000);
});

after(async () => {
  await browser.close();
});
