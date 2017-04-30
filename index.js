const requireIndex = require('requireindex');

const lib = requireIndex(`${__dirname}/lib/`);
module.exports = lib;

lib['coverage-updater'].updateCodeCoverage();
