const path = require('path');
const utils = require('./utils');

const FLEXIBILITY = 0.5;
const METRICS = ['statements', 'branches', 'functions', 'lines'];

function getCoverageSummaryPath(coveragePath) {
  const coverageDir = path.join(__dirname, coveragePath);
  const directories = utils.getDirectories(coverageDir);
  directories.filter(dir => !/src|node_modules/.test(dir));
  const coverageSummaryDir = directories.length ? directories[0] : '';
  return path.join(coveragePath, coverageSummaryDir, 'coverage-summary.json');
}

function getCoverageSummaryTotal(coverageSummary) {
  const res = {};
  METRICS.forEach((key) => {
    res[key] = coverageSummary.total ? coverageSummary.total[key].pct : 0;
  });
  return res;
}

function calcCheck(newCheck, flexibility, oldCheck) {
  const res = {};
  Object.keys(newCheck).forEach((key) => {
    const newTh = newCheck[key] - flexibility || 0;
    const oldTh = oldCheck[key] || 0;
    res[key] = newTh > oldTh ? newTh : oldTh;
  });
  return res;
}

function updateCodeCoverage(options) {
  const optionsRef = options || {};
  const coveragePath = optionsRef.coveragePath || 'coverage';
  const coverageCheckPath = optionsRef.coverageCheckPath || 'coverage.conf.json';
  const flexibility = optionsRef.flexibility || FLEXIBILITY;

  const coverageSummaryPath = getCoverageSummaryPath(coveragePath);
  const coverageSummary = utils.getJson(coverageSummaryPath);

  const coverageCheck = getCoverageSummaryTotal(coverageSummary);

  const check = calcCheck(coverageCheck, {}, flexibility);

  const isYaml = /\.yml$/.test(check);
  if (isYaml) {
    utils.writeYaml(coverageCheckPath, check);
  } else {
    utils.writeJson(coverageCheckPath, check);
  }

  console.log('coverage-updater: updating "', coverageCheckPath, '":\n', coverageCheck);
}

module.exports = {
  getCoverageSummaryPath,
  getCoverageSummaryTotal,
  calcCheck,
  updateCodeCoverage,
};
