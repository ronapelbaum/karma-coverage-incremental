const path = require('path');
const utils = require('./utils');
const coverageUpdater = require('./coverage-updater');

const JSON_SUMMARY_REPORTER = {
  type: 'json-summary',
  file: 'coverage-summary.json',
  dir: 'coverage',
};

function getBrowserDir(coverageDir) {
// solution for karma browser
  const directories = utils.getDirectories(coverageDir);
  directories.filter(dir => !/lib|spec|src|node_modules/.test(dir));
  return directories.length ? directories[0] : '';
}

function getJsonSummaryPath(jsonSummaryReporter) {
  const fileName = jsonSummaryReporter.file || JSON_SUMMARY_REPORTER.file;
  const dirName = jsonSummaryReporter.dir || JSON_SUMMARY_REPORTER.dir;
  const browserDir = getBrowserDir(dirName);
  return path.join(dirName, browserDir, fileName);
}

function getJsonSummary(coverageReporter) {
  if (coverageReporter.type === JSON_SUMMARY_REPORTER.type) {
    return getJsonSummaryPath(coverageReporter);
  }
  const reporters = coverageReporter.reporters || [];
  for (let i = 0; i < reporters.length; i++) {
    if (reporters[i].type === JSON_SUMMARY_REPORTER.type) {
      return getJsonSummaryPath(reporters[i]);
    }
  }
  return undefined;
}

/* eslint no-unused-vars: "warn" */
const incrementReporter = function (rootConfig, helper, logger) {
  // TODO change to ES6 class ?
  const reporters = (rootConfig.reporters || []);
  if (!reporters.includes('coverage')) {
    throw new Error('coverage reporter should be used');
  }

  const coverageReporter = rootConfig.coverageReporter || {};

  // TODO get this from Istanbul - don't depend on json-summary
  const jsonSummary = getJsonSummary(coverageReporter);
  if (!jsonSummary) {
    throw new Error('json-summary coverage-reporter should be used');
  }

  const config = rootConfig.incrementConfig || {};

  this.onExit = function (done) {
    coverageUpdater.updateCodeCoverage(getJsonSummary(coverageReporter), config)
      .then(done);
  };
};

incrementReporter.$inject = ['config', 'helper', 'logger'];

module.exports = {
  'reporter:increment': ['type', incrementReporter],
};
