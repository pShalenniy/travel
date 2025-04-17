const { setHeadlessWhen } = require('@codeceptjs/configure');
require('dotenv').config({ path: '.env' });

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './tests/e2e/**/*_test.js',
  output: './tests/e2e/output',
  helpers: {
    Puppeteer: {
      url: 'http://127.0.0.1:8080',
      show: true,
      waitForNavigation: 'networkidle0',
      windowSize: '1680x900'
    }
    // PuppeteerHelper: {
    //   require: './helpers/puppeteer_helper.js'
    // }
  },
  include: {
    I: './tests/e2e/support/steps_file.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'travel-fe',
  plugins: {
    retryFailedStep: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    }
  }
};
