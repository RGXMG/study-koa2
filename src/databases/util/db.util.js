const mysql = require('mysql');

const sqlPool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'qwer1234.0',
  databases: 'test',
});

const query = (sql, values) => {
  return new Promise( (resolve, reject) => {
    try {
      sqlPool.getConnection((err, connec) => connec.query(sql, (err, rows) => resolve(rows), connec.release()))
    } catch (e) {
      reject(e);
    }
})
};
module.expors = {
  query,
};