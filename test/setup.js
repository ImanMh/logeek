// Export modules to global scope as necessary (only for testing)
if (typeof window === 'undefined') {
  // We are in node. Require modules.
  expect = require('chai').expect;
  sinon = require('sinon');
  logeek = require('../dist/logeek').logeek;
  isBrowser = false;
} else {
  // We are in the browser. Set up variables like above using served js files.
  expect = chai.expect;
  // num and sinon already exported globally in the browser.
  isBrowser = true;
}
