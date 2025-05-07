const sql = require('better-sqlite3');
const db = sql('../db.sqlite');

export const getRepository = async () => {
  return db.prepare('SELECT name FROM sqlite_master WHERE type="table"');
  // return db.prepare('select * from repository').all();
};
