const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;

/**
 * 读取文件操作
 * @param path
 * @param encoding
 * @returns {Promise<void>}
 */
const readFile = (path, encoding = 'utf-8') => {
  try {
    const res = fs.readdirSync(path, { encoding });
    return res;
  } catch (e) {
    throw new Error(`An error occurred while the ${path} file was being read---${e}`);
  }
};

/**
 * 读取某路径下面所有文件及文件夹
 * @param path
 * @returns {Array}
 */
const readAllDir = path => {
  const dirList = [];
  // 读取path下面所有的文件
  const fileArr = fs.readdirSync(path);
  if (fileArr.length === 0) return [];
  for (let [i, item] of fileArr.entries()) {
    dirList[i] = `${path}\\${item}`;
  }
  return dirList;
};

/**
 * 读取某路径下面所有特定扩展名所有文件
 * @param dir
 * @param extName 文件扩展名 传递 * 表示返回所有读取到的文件
 * @returns {Promise<Array>}
 */
let readAllFile = (dir, extName) => {
  if (!extName) throw new Error('extName is not defined');
  const fileList = [];
  const dirArr = readAllDir(dir);
  readAllFile = dirArr => {
    for (let i of dirArr) {
      try {
        const stat = fs.statSync(i);
        if (stat.isDirectory()) { readAllFile(readAllDir(i)) }
        else {
          extName === '*' ? fileList[fileList.length] = i
            : path.extname(i) === `.${extName}` ? fileList[fileList.length] = i : '';
        }
      } catch (e) {
        throw e;
      }
    }
  };
  readAllFile(dirArr);
  return fileList;
};
module.exports = {
  readFile,
  readAllDir,
  readAllFile,
};