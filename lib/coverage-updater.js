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
    options = options || {};
    const coveragePath = options.coveragePath || path.join(__dirname, 'coverage');
    const coverageCheckPath = options.coverageCheckPath || 'coverage.conf.json';
    const flexibility = options.flexibility || FLEXIBILITY;

    const coverageSummaryPath = getCoverageSummaryPath(coveragePath);

    const summaryTotal = getCoverageSummaryTotal(coverageSummaryPath, flexibility);

    utils.writeJson(coverageCheckPath, summaryTotal);

    console.log('coverage-updater: updating "coverage.conf.json":\n', summaryTotal);
}

module.exports = {
    updateCodeCoverage: updateCodeCoverage
};
