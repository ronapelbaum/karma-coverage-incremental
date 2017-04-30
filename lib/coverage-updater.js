const fs = require('fs');
const path = require('path');
const utils = require('./utils');

const FLEXIBILITY = 0.5;

function getCoverageSummaryPath(coveragePath) {
    const directories = utils.getDirectories(coveragePath);
    directories.filter(dir => !/src|node_modules/.test(dir));
    const coverageSummaryDir =  directories.length ? directories[0] : '';
    return path.join(coveragePath, coverageSummaryDir, 'coverage-summary.json');
}

function getCoverageSummaryTotal(coverageSummaryPath, flexibility) {
    const coverageSummary = utils.getJson(coverageSummaryPath);
    const res = {};
    ['statements', 'branches', 'functions', 'lines'].forEach((key) => {
        res[key] = coverageSummary.total ? coverageSummary.total[key].pct - flexibility : 0;
    });
    return res;
}


function updateCodeCoverage(options) {
    const coverageDir = options.coveragePath || path.join(__dirname, 'coverage');
    const flexibility = options.flexibility || FLEXIBILITY;

    const coverageSummaryPath = getCoverageSummaryPath(coverageDir);

    const summaryTotal = getCoverageSummaryTotal(coverageSummaryPath, flexibility);

    fs.writeFileSync(path.join(__dirname, 'coverage.conf.json'), `${JSON.stringify(summaryTotal, null, 2)}\n`, 'utf8');

    console.log('coverage-updater: updating "coverage.conf.json":\n', summaryTotal);
}

module.exports = {
    updateCodeCoverage: updateCodeCoverage
};
