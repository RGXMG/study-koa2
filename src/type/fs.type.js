const fs = require('fs');
const { promisify } = require('util');
const statPromisify = promisify(fs.stat);

const isFile = path => {
  fs.statSync(path);
};