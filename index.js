const requireIndex = require('requireindex');
const lib = requireIndex(`${__dirname}/lib/`);

// module.exports = lib;
module.exports = lib['karma-plugin'];
