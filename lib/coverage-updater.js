const fs = require('fs');
const path = require('path');

const FLEXIBILITY = 0.5;
const ROOT = path.join(__dirname, '..', '..', '..');

function getDirectories(parent) {
  return fs.readdirSync(parent)
        .filter(file => fs.statSync(path.join(parent, file)).isDirectory());
}

function getCoverageSummaryPath(coveragePath) {
  if (fs.existsSync(coveragePath)) {
    const directories = getDirectories(coveragePath);
    directories.filter(dir => !/src|node_modules/.test(dir));
    return directories[0];
  }
}
function getCoverageSummary(coveragePath) {
  const coverageSummaryPath = getCoverageSummaryPath(coveragePath);
  const fileContent = fs.readFileSync(path.join(coveragePath, coverageSummaryPath, 'coverage-summary.json'));
  return JSON.parse(fileContent);
}

function getCoverageSummaryTotal(coveragePath) {
  const coverageSummary = getCoverageSummary(coveragePath);

  const res = {};
  ['statements', 'branches', 'functions', 'lines'].forEach(key => res[key] = coverageSummary.total[key].pct - FLEXIBILITY);
  return res;
}


const coveragePath = path.join(ROOT, 'coverage');
const summaryTotal = getCoverageSummaryTotal(coveragePath);

fs.writeFileSync(path.join(ROOT, 'coverage.conf.json'), `${JSON.stringify(summaryTotal, null, 2)}\n`, 'utf8');

console.log('coverage-updater: updating \"coverage.conf.json\":\n', summaryTotal);
