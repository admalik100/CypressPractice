const { defineConfig } = require('cypress');
require('dotenv').config();
const PASS = process.env.PASSWORD;
const INCORRECTPASS = process.env.INCORRECTPASSWORD;

if (!PASS || !INCORRECTPASS) {
  throw new Error('Please configure enviornment Variables');
}
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    chromeWebSecurity: false,
    baseUrl: 'https://demoqa.com/',
    requestTimeout: 10000,
  },
  env: {
    apiPass: process.env.PASSWORD,
    incorrectPass: process.env.INCORRECTPASSWORD,
  },
});
