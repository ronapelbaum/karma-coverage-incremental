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

function updateCodeCoverage(coverageSummaryPath, options = {}) {
  console.log('ron coverage-updater.updateCodeCoverage()', coverageSummaryPath, options);//TODO remove this
  const coverageCheckPath = options.coverageCheckPath || path.join(ROOT, 'coverage.conf.json');
  const flexibility = options.flexibility || FLEXIBILITY;

  const coverageSummary = utils.getJson(coverageSummaryPath);

  console.log('ron coverage-updater.updateCodeCoverage() coverageSummary: ', coverageSummary);//TODO remove this
  const coverageCheck = getCoverageSummaryTotal(coverageSummary);

  const oldCheck = {};// TODO get this from latest

  const check = calcCheck(coverageCheck, flexibility, oldCheck);

  const isYaml = /\.yml$/.test(check);
  if (isYaml) {
    utils.writeYaml(coverageCheckPath, check);
  } else {
    utils.writeJson(coverageCheckPath, check);
  }

  console.log('coverage-updater: updating "', coverageCheckPath, '":\n', coverageCheck);
}

module.exports = {
  getCoverageSummaryTotal,
  calcCheck,
  updateCodeCoverage,
};
