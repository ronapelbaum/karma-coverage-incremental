const fs = require('fs');
const jsYaml = require('js-yaml');
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

function writeJson(filePath, jsonData) {
  const data = `${JSON.stringify(jsonData, null, 2)}\n`;
  fs.writeFileSync(path.join(__dirname, filePath), data, 'utf8');
}

function writeYaml(filePath, yamlData) {
  const yamlConf = jsYaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
    // TODO add this as param!
  yamlConf.check = yamlConf.check || {};
  yamlConf.check.global = yamlData;

  const data = jsYaml.safeDump(yamlConf);
  fs.writeFileSync(path.join(__dirname, filePath), data, 'utf8');
}

module.exports = {
  getDirectories,
  getJson,
  writeJson,
  writeYaml,
};
