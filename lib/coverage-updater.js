const fs = require('fs');
const path = require('path');
const utils = require('./utils');

const FLEXIBILITY = 0.5;
const METRICS = ['statements', 'branches', 'functions', 'lines'];

function getCoverageSummaryPath(coveragePath) {
    const coverageDir = path.join(__dirname, coveragePath);
    const directories = utils.getDirectories(coverageDir);
    directories.filter(dir => !/src|node_modules/.test(dir));
    const coverageSummaryDir =  directories.length ? directories[0] : '';
    return path.join(coveragePath, coverageSummaryDir, 'coverage-summary.json');
}

function getCoverageSummaryTotal(coverageSummary, flexibility) {
    const res = {};
    METRICS.forEach((key) => {
        res[key] = coverageSummary.total ? coverageSummary.total[key].pct - flexibility : 0;
    });
    return res;
}

function updateCodeCoverage(options) {
    options = options || {};
    const coveragePath = options.coveragePath || 'coverage';
    const coverageCheckPath = options.coverageCheckPath || 'coverage.conf.json';
    const flexibility = options.flexibility || FLEXIBILITY;

    const coverageSummaryPath = getCoverageSummaryPath(coveragePath);
    const coverageSummary = utils.getJson(coverageSummaryPath);

    const coverageCheck = getCoverageSummaryTotal(coverageSummary, flexibility);

    utils.writeJson(coverageCheckPath, coverageCheck);

    console.log('coverage-updater: updating "',coverageCheckPath,'":\n', coverageCheck);
}

module.exports = {

    updateCodeCoverage: updateCodeCoverage
};
