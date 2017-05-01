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

/* eslint no-unused-vars: "off" */
const KarmaPlugin = function (rootConfig, helper, logger) {
  const reporters = (rootConfig.reporters || []);
  if (!reporters.includes('coverage')) {
    throw new Error('coverage reporter should be used');
  }

  const config = rootConfig.incrementConfig || {};

  const coverageReporter = rootConfig.coverageReporter || {};

  const jsonSummary = getJsonSummary(coverageReporter);
  if (!jsonSummary) {
    throw new Error('json-summary coverage-reporter should be used');
  }
  console.log('ron karma-plugin.KarmaPlugin()', jsonSummary);// TODO remove this

  // TODO handle config
  coverageUpdater.updateCodeCoverage(config);
};

KarmaPlugin.$inject = ['config', 'helper', 'logger'];

module.exports = {
  'reporter:increment': ['type', KarmaPlugin],
};
