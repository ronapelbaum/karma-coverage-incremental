const fs = require('fs');
const path = require('path');

const FLEXIBILITY = 0.5;
const ROOT = path.join(__dirname, '..', '..', '..');

function getDirectories(parent) {
    if (fs.existsSync(parent)) {
        return fs.readdirSync(parent)
            .filter(file => fs.statSync(path.join(parent, file)).isDirectory());
    } else {
        return [];
    }
}

function getCoverageSummaryDir(coveragePath) {
    const directories = getDirectories(coveragePath);
    directories.filter(dir => !/src|node_modules/.test(dir));
    return directories.length ? directories[0] : '';
}
function getCoverageSummary(coveragePath) {
    const coverageSummaryDir = getCoverageSummaryDir(coveragePath);
    const coverageSummaryPath = path.join(coveragePath, coverageSummaryDir, 'coverage-summary.json');
    const fileContent = fs.existsSync(coverageSummaryPath) && fs.readFileSync(coverageSummaryPath);
    return fileContent ? JSON.parse(fileContent) : {};
}

function getCoverageSummaryTotal(coveragePath) {
    const coverageSummary = getCoverageSummary(coveragePath);
    const res = {};
    ['statements', 'branches', 'functions', 'lines'].forEach(key => res[key] = coverageSummary.total ? coverageSummary.total[key].pct - FLEXIBILITY : 0);
    return res;
}


const coveragePath = path.join(ROOT, 'coverage');
const summaryTotal = getCoverageSummaryTotal(coveragePath);

fs.writeFileSync(path.join(ROOT, 'coverage.conf.json'), `${JSON.stringify(summaryTotal, null, 2)}\n`, 'utf8');

console.log('coverage-updater: updating \"coverage.conf.json\":\n', summaryTotal);
