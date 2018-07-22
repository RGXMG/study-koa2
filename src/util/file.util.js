const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const read = promisify(fs.readFile);
const statAsync = promisify(fs.stat);

/**
 * 读取文件操作
 * @param path
 * @param encoding
 * @returns {Promise<void>}
 */
const readFile = async (path, encoding = 'utf-8') => {
  try {
    const res = await read(path, { encoding });
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
 * @param dirArr
 * @param fileType 传递 * 表示返回所有读取到的文件
 * @returns {Promise<Array>}
 */
let readAllFile = async (dirArr, fileType) => {
  if (!fileType) throw new Error('fileType is not defined');
  const fileList = [];
  readAllFile = async dirArr => {
    for (let i of dirArr) {
      try {
        const stat = await statAsync(i);
        if (stat.isDirectory()) { await readAllFile(readAllDir(i)) }
        else {
          if (fileType === '*') { fileList[fileList.length] = i }
          else path.extname(i) === `.${fileType}` ? fileList[fileList.length] = i : '';
        }
      } catch (e) {
        throw e;
      }
    }
  };
  await readAllFile(dirArr);
  console.log(fileList);
  return fileList;
};
module.exports = {
  readFile,
  readAllDir,
  readAllFile,
};