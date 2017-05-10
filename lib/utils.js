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

function delayExec(test, resolve, reject, delay, tries) {
  let it = tries;
  (function retry() {
    it -= 1;
    if (test()) {
      resolve();
    } else if (it > 0) {
      setTimeout(retry, delay);
    } else {
      reject();
    }
  }());
}

function getFilePromise(filePath) {
  return new Promise((resolve, reject) => {
    const delayResolve = () => fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
    const delayTest = () => fs.existsSync(filePath);
    const delayReject = () => reject(`${filePath} not found!`);
    delayExec(delayTest, delayResolve, delayReject, 300, 5);
  });
}

function getJsonPromise(filePath) {
  const empty = {};
  return getFilePromise(filePath)
    .then(fileContent => JSON.parse(fileContent))
    .catch(() => empty);
}

function getJson(filePath) {
  const fileContent = fs.existsSync(filePath) && fs.readFileSync(filePath);
  return fileContent ? JSON.parse(fileContent) : {};
}

function writeJson(filePath, jsonData) {
  const data = `${JSON.stringify(jsonData, null, 2)}\n`;
  fs.writeFileSync(filePath, data, 'utf8');
}

function writeYaml(filePath, yamlData) {
  const yamlConf = jsYaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
  // TODO add this as param!
  yamlConf.check = yamlConf.check || {};
  yamlConf.check.global = yamlData;

  const data = jsYaml.safeDump(yamlConf);
  fs.writeFileSync(filePath, data, 'utf8');
}

module.exports = {
  getDirectories,
  getJson,
  getJsonPromise,
  writeJson,
  writeYaml,
};
