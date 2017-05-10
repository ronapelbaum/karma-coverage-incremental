const path = require('path');
const utils = require('./utils');

const FLEXIBILITY = 0.5;
const METRICS = ['statements', 'branches', 'functions', 'lines'];
const ROOT = process.cwd() || path.join(__dirname, '..');

function getCoverageSummaryTotal(coverageSummary) {
  const res = {};
  METRICS.forEach((key) => {
    const pct = coverageSummary.total &&
      coverageSummary.total[key] &&
      coverageSummary.total[key].pct;
    res[key] = pct || 0;
  });
  return res;
}

function calcCheck(newCheck, flexibility = 0, oldCheck = {}) {
  const res = {};
  Object.keys(newCheck).forEach((key) => {
    const newTh = newCheck[key] - flexibility || 0;
    const oldTh = oldCheck[key] || 0;
    res[key] = newTh > oldTh ? newTh : oldTh;
  });
  return res;
}

function exportCoverageCheck(coverageCheckPath, check) {
  const isYaml = /\.yml$/.test(coverageCheckPath);
  if (isYaml) {
    utils.writeYaml(coverageCheckPath, check);
  } else {
    utils.writeJson(coverageCheckPath, check);
  }

  console.log('coverage-updater: updating "', coverageCheckPath, '":\n', check);
}

function getCoverageCheck(coverageSummary, flexibility) {
  const coverageCheck = getCoverageSummaryTotal(coverageSummary);

  const oldCheck = {};// TODO get this from latest

  return calcCheck(coverageCheck, flexibility, oldCheck);
}

function updateCodeCoverage(coverageSummaryPath, options = {}) {
  const coverageCheckPath = options.coverageCheckPath || path.join(ROOT, 'coverage.conf.json');
  const flexibility = options.flexibility || FLEXIBILITY;

  // TODO get this from Istanbul
  // https://github.com/lithiumtech/karma-threshold-reporter/blob/master/index.js
  // const coverageSummary = await utils.getJson(coverageSummaryPath);
  return utils.getJsonPromise(coverageSummaryPath)
    .then((coverageSummary) => {
      const check = getCoverageCheck(coverageSummary, flexibility);
      exportCoverageCheck(coverageCheckPath, check);
    });
}

module.exports = {
  getCoverageSummaryTotal,
  calcCheck,
  updateCodeCoverage,
};
