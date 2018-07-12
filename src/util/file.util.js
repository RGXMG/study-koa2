const fs = require('fs');
const promisify = require('util').promisify;
const read = promisify(fs.readFile);

const readFile = async path => {
  try {
    const res = await read(path, { encoding: 'utf-8' });
    return res;
  } catch (e) {
    throw new Error(`An error occurred while the ${path} file was being read---${e}`);
  }
};
module.exports = {
  readFile,
};