const coverageUpdater = require('./coverage-updater');

const JSON_SUMMARY_REPORTER = {
  type: 'json-summary',
  file: 'coverage-summary.json',
};

function getJsonSummary(coverageReporter) {
  if (coverageReporter.type === JSON_SUMMARY_REPORTER.type) {
    return coverageReporter.file || JSON_SUMMARY_REPORTER.file;
  }
  const reporters = coverageReporter.reporters || [];
  for (let i = 0; i < reporters.length; i++) {
    if (reporters[i].type === JSON_SUMMARY_REPORTER.type) {
      return reporters[i].file || JSON_SUMMARY_REPORTER.file;
    }
  }
  return undefined;
}

/* eslint no-unused-vars: "warn" */
const incrementReporter = function (rootConfig, helper, logger) {
  const reporters = (rootConfig.reporters || []);
  if (!reporters.includes('coverage')) {
    throw new Error('coverage reporter should be used');
  }

  const coverageReporter = rootConfig.coverageReporter || {};

  const jsonSummary = getJsonSummary(coverageReporter);
  if (!jsonSummary) {
    throw new Error('json-summary coverage-reporter should be used');
  }

  // TODO handle config
  const config = rootConfig.incrementConfig || {};
  config.isKarma = true;
  // config.coverageSummaryPath = jsonSummary;
  coverageUpdater.updateCodeCoverage(config);
};

incrementReporter.$inject = ['config', 'helper', 'logger'];

module.exports = {
  'reporter:increment': ['type', incrementReporter],
};
