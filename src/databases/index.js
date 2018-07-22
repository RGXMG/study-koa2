const path = require('path');
const { readAllDir, readAllFile } = require(`${__PATH}/util/file.util`);

const excuteAllSqlFile = () => {
  // 获取sql路径下面所有的文件
  const allDir = readAllDir(path.join(__dirname, '/sql'));
  const allFile = readAllFile(allDir, 'sql');
  console.log(allFile);
};

module.exports = {
  excuteAllSqlFile,
};