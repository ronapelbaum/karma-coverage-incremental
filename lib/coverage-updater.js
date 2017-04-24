const fs = require('fs');
const path = require('path');

const FLEXIBILITY = 0.5;
const ROOT = path.join(__dirname,'..','..','..');

function getDirectories(parent) {
    return fs.readdirSync(parent)
        .filter(file => fs.statSync(path.join(parent, file)).isDirectory());
}

function getCoverageSummaryPath(coveragePath) {
    if (fs.existsSync(coveragePath)) {
        let directories = getDirectories(coveragePath);
        directories.filter(dir => !/src|node_modules/.test(dir));
        return directories[0];
    }
}
function getCoverageSummary(coveragePath) {
    let coverageSummaryPath = getCoverageSummaryPath(coveragePath);
    let fileContent = fs.readFileSync(path.join(coveragePath, coverageSummaryPath, 'coverage-summary.json'));
    return JSON.parse(fileContent);
}

function getCoverageSummaryTotal(coveragePath) {
    let coverageSummary = getCoverageSummary(coveragePath);

    let res = {};
    ['statements', 'branches', 'functions', 'lines'].forEach(key => res[key] = coverageSummary.total[key].pct - FLEXIBILITY);
    return res;
}


let coveragePath = path.join(ROOT, 'coverage');
let summaryTotal = getCoverageSummaryTotal(coveragePath);

fs.writeFileSync(path.join(ROOT, 'coverage.conf.json'), JSON.stringify(summaryTotal, null, 2) + '\n', 'utf8');

console.log('coverage-updater: updating \"coverage.conf.json\":\n', summaryTotal);
