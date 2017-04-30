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

module.exports = {
    getDirectories: getDirectories,
    getJson: getJson
};
