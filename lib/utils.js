const fs = require('fs');
const path = require('path');


function getDirectories(parent) {
  if (fs.existsSync(parent)) {
    return fs.readdirSync(parent)
            .filter(file => fs.statSync(path.join(parent, file)).isDirectory());
  }
  return [];
}

function getJson(filePath) {
  const fileContent = fs.existsSync(filePath) && fs.readFileSync(filePath);
  return fileContent ? JSON.parse(fileContent) : {};
}

function writeJson(filePath, summaryTotal) {
  fs.writeFileSync(path.join(__dirname, filePath), `${JSON.stringify(summaryTotal, null, 2)}\n`, 'utf8');
}

module.exports = {
  getDirectories,
  getJson,
  writeJson,
};
